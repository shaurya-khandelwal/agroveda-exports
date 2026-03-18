import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { z } from 'zod'
import { ObjectId } from 'mongodb'
import { getDb } from '@/lib/mongodb'
import type { ProductDoc } from '@/lib/models'
import { serializeProduct } from '@/lib/serialize'

const productSchema = z.object({
  name: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  imageUrl: z.string().optional(),
  price: z.number().optional(),
  unit: z.string().optional(),
  inStock: z.boolean().optional(),
})

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: 'Invalid product id' }, { status: 400 })
    }

    const db = await getDb()
    const product = await db
      .collection<ProductDoc>('products')
      .findOne({ _id: new ObjectId(params.id) })

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json(serializeProduct(product))
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: 'Invalid product id' }, { status: 400 })
    }

    const body = await request.json()
    const data = productSchema.parse(body)

    const db = await getDb()
    const productsCol = db.collection<ProductDoc>('products')

    if (data.slug) {
      const slugOwner = await productsCol.findOne(
        { slug: data.slug },
        { projection: { _id: 1 } }
      )
      if (slugOwner && slugOwner._id.toHexString() !== params.id) {
        return NextResponse.json(
          { error: 'Slug already exists' },
          { status: 409 }
        )
      }
    }

    const update: Partial<ProductDoc> = {
      ...(data.name !== undefined ? { name: data.name } : {}),
      ...(data.slug !== undefined ? { slug: data.slug } : {}),
      ...(data.description !== undefined ? { description: data.description } : {}),
      ...(data.imageUrl !== undefined ? { imageUrl: data.imageUrl ?? null } : {}),
      ...(data.price !== undefined ? { price: data.price ?? null } : {}),
      ...(data.unit !== undefined ? { unit: data.unit ?? null } : {}),
      ...(data.inStock !== undefined ? { inStock: data.inStock } : {}),
      updatedAt: new Date(),
    }

    const updated = await productsCol.findOneAndUpdate(
      { _id: new ObjectId(params.id) },
      { $set: update },
      { returnDocument: 'after' }
    )

    if (!updated) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json(serializeProduct(updated as ProductDoc))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: 'Invalid product id' }, { status: 400 })
    }

    const db = await getDb()
    const result = await db
      .collection<ProductDoc>('products')
      .deleteOne({ _id: new ObjectId(params.id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Product deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}
