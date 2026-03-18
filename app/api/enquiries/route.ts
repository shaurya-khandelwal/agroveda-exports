import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { z } from 'zod'
import { ObjectId } from 'mongodb'
import { getDb } from '@/lib/mongodb'
import type { EnquiryDoc, ProductDoc } from '@/lib/models'
import { serializeEnquiry } from '@/lib/serialize'

const enquirySchema = z.object({
  productId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid productId'),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  message: z.string().optional(),
})

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const db = await getDb()
    const enquiries = await db
      .collection<EnquiryDoc>('enquiries')
      .aggregate([
        { $sort: { createdAt: -1 } },
        {
          $lookup: {
            from: 'products',
            localField: 'productId',
            foreignField: '_id',
            as: 'product',
          },
        },
        { $unwind: { path: '$product', preserveNullAndEmptyArrays: true } },
        {
          $project: {
            _id: 1,
            productId: 1,
            name: 1,
            email: 1,
            phone: 1,
            message: 1,
            createdAt: 1,
            product: {
              _id: '$product._id',
              name: '$product.name',
              slug: '$product.slug',
            },
          },
        },
      ])
      .toArray()

    const result = enquiries.map((row: any) => ({
      ...serializeEnquiry(row as EnquiryDoc),
      product: row.product?._id
        ? {
            id: String(row.product._id),
            name: String(row.product.name ?? ''),
            slug: String(row.product.slug ?? ''),
          }
        : null,
    }))

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch enquiries' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = enquirySchema.parse(body)

    if (!ObjectId.isValid(data.productId)) {
      return NextResponse.json({ error: 'Invalid productId' }, { status: 400 })
    }

    const db = await getDb()
    const product = await db
      .collection<ProductDoc>('products')
      .findOne(
        { _id: new ObjectId(data.productId) },
        { projection: { name: 1 } }
      )

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    const now = new Date()
    const insertResult = await db.collection<EnquiryDoc>('enquiries').insertOne({
      productId: new ObjectId(data.productId),
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message ?? null,
      createdAt: now,
    } as unknown as EnquiryDoc)

    const created = await db
      .collection<EnquiryDoc>('enquiries')
      .findOne({ _id: insertResult.insertedId })

    // In a real application, you would send emails and WhatsApp messages here
    // For now, we'll just return success

    return NextResponse.json(
      {
        message: 'Enquiry submitted successfully',
        enquiry: created ? serializeEnquiry(created) : null,
        whatsappLink: `https://wa.me/${process.env.WHATSAPP_NUMBER || '919876543210'}?text=Hello, I am interested in ${encodeURIComponent(product.name)}`,
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json(
      { error: 'Failed to submit enquiry' },
      { status: 500 }
    )
  }
}
