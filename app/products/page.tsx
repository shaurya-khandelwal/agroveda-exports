import ProductCard from '@/components/ProductCard'
import { getDb } from '@/lib/mongodb'
import type { ProductDoc } from '@/lib/models'
import { serializeProduct } from '@/lib/serialize'
import { Leaf } from 'lucide-react'

export const dynamic = 'force-dynamic'

async function getProducts() {
  const db = await getDb()
  const products = await db
    .collection<ProductDoc>('products')
    .find({ inStock: true })
    .sort({ createdAt: -1 })
    .toArray()

  return products.map(serializeProduct)
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="min-h-screen bg-cream-50">

      {/* Hero header */}
      <div className="relative overflow-hidden bg-forest-900 py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_30%_50%,rgba(217,151,38,0.14),transparent_65%)]" />
        <div className="absolute inset-0 stripe-pattern" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-cream-50" />

        <div className="relative container mx-auto px-4 text-center text-white">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="inline-block h-px w-8 bg-gradient-to-r from-transparent to-gold-400/70 rounded-full" />
            <p className="text-gold-300/85 uppercase tracking-[0.5em] text-[10px] sm:text-xs font-semibold">
              Our Catalogue
            </p>
            <span className="inline-block h-px w-8 bg-gradient-to-l from-transparent to-gold-400/70 rounded-full" />
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-5">
            Premium Export-Grade{' '}
            <span className="gradient-text-gold">Products</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto leading-relaxed">
            Directly sourced from India&apos;s finest farms — certified, tested,
            and ready for global markets.
          </p>
        </div>
      </div>

      {/* Products grid */}
      <div className="container mx-auto px-4 py-16">
        {products.length === 0 ? (
          <div className="text-center py-24">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-forest-50 border border-forest-900/[0.08] mb-5">
              <Leaf className="w-7 h-7 text-forest-400" />
            </div>
            <p className="text-forest-900/50 text-lg">No products available at the moment.</p>
          </div>
        ) : (
          <>
            <p className="text-forest-900/40 text-xs uppercase tracking-[0.35em] mb-8 text-center">
              {products.length} product{products.length !== 1 ? 's' : ''} available
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
