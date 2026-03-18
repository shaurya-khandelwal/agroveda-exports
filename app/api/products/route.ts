import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { z } from 'zod'
import { getDb } from '@/lib/mongodb'
import type { ProductDoc } from '@/lib/models'
import { serializeProduct } from '@/lib/serialize'

const productSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  imageUrl: z.string().optional(),
  price: z.number().optional(),
  unit: z.string().optional(),
  inStock: z.boolean().optional(),
})

export async function GET() {
  try {
    const db = await getDb()
    const products = await db
      .collection<ProductDoc>('products')
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json(products.map(serializeProduct))
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const data = productSchema.parse(body)

    const db = await getDb()
    const productsCol = db.collection<ProductDoc>('products')

    const existing = await productsCol.findOne({ slug: data.slug })
    if (existing) {
      return NextResponse.json(
        { error: 'Slug already exists' },
        { status: 409 }
      )
    }

    const now = new Date()
    const insertResult = await productsCol.insertOne({
      name: data.name,
      slug: data.slug,
      description: data.description,
      imageUrl: data.imageUrl ?? null,
      price: data.price ?? null,
      unit: data.unit ?? null,
      inStock: data.inStock ?? true,
      createdAt: now,
      updatedAt: now,
    } as unknown as ProductDoc)

    const created = await productsCol.findOne({ _id: insertResult.insertedId })
    if (!created) {
      return NextResponse.json(
        { error: 'Failed to create product' },
        { status: 500 }
      )
    }

    return NextResponse.json(serializeProduct(created as ProductDoc), {
      status: 201,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}
