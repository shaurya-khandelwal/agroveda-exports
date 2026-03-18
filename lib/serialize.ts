import type { ObjectId } from 'mongodb'
import type { EnquiryDoc, ProductDoc, UserDoc } from '@/lib/models'

function idToString(id: ObjectId) {
  return id.toHexString()
}

export function serializeProduct(product: ProductDoc) {
  return {
    id: idToString(product._id),
    name: product.name,
    slug: product.slug,
    description: product.description,
    imageUrl: product.imageUrl ?? null,
    price: product.price ?? null,
    unit: product.unit ?? null,
    inStock: product.inStock,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  }
}

export function serializeEnquiry(enquiry: EnquiryDoc) {
  return {
    id: idToString(enquiry._id),
    productId: idToString(enquiry.productId),
    name: enquiry.name,
    email: enquiry.email,
    phone: enquiry.phone,
    message: enquiry.message ?? null,
    createdAt: enquiry.createdAt,
  }
}

export function serializeUser(user: UserDoc) {
  return {
    id: idToString(user._id),
    email: user.email,
    name: user.name ?? null,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }
}

