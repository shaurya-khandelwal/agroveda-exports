import { ObjectId } from 'mongodb'

export type Role = 'ADMIN' | 'CUSTOMER'

export interface UserDoc {
  _id: ObjectId
  email: string
  password: string
  name?: string | null
  role: Role
  createdAt: Date
  updatedAt: Date
}

export interface ProductDoc {
  _id: ObjectId
  name: string
  slug: string
  description: string
  imageUrl?: string | null
  price?: number | null
  unit?: string | null
  inStock: boolean
  createdAt: Date
  updatedAt: Date
}

export interface EnquiryDoc {
  _id: ObjectId
  productId: ObjectId
  name: string
  email: string
  phone: string
  message?: string | null
  createdAt: Date
}

export function toIdString(id: ObjectId) {
  return id.toHexString()
}

