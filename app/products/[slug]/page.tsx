import { notFound } from 'next/navigation'
import ProductDetail from '@/components/ProductDetail'
import EnquiryForm from '@/components/EnquiryForm'
import { getDb } from '@/lib/mongodb'
import type { ProductDoc } from '@/lib/models'
import { serializeProduct } from '@/lib/serialize'

export const dynamic = 'force-dynamic'

async function getProduct(slug: string) {
  const db = await getDb()
  const product = await db.collection<ProductDoc>('products').findOne({ slug })
  return product ? serializeProduct(product) : null
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string }
}) {
  const product = await getProduct(params.slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Thin forest bar at very top */}
      <div className="h-1 bg-gradient-to-r from-forest-900 via-gold-500 to-forest-900" />

      <div className="container mx-auto px-4 py-12 md:py-16">
        <ProductDetail product={product} />

        {/* Enquiry form */}
        <div className="mt-10 max-w-2xl mx-auto">
          <EnquiryForm productId={product.id} productName={product.name} />
        </div>
      </div>
    </div>
  )
}
