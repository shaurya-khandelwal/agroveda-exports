import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { getDb } from '@/lib/mongodb'
import type { ProductDoc } from '@/lib/models'
import { serializeProduct } from '@/lib/serialize'
import SectionHeading from '@/components/SectionHeading'
import Reveal from '@/components/Reveal'

async function getFeaturedProducts() {
  const db = await getDb()
  const products = await db
    .collection<ProductDoc>('products')
    .find({ inStock: true })
    .sort({ createdAt: -1 })
    .limit(4)
    .toArray()

  return products.map(serializeProduct)
}

export default async function ProductShowcase() {
  const products = await getFeaturedProducts()

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-cream-50 to-cream-100/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_100%,rgba(217,151,38,0.06),transparent)]" />

      <div className="relative container mx-auto px-4">
        <Reveal>
          <SectionHeading
            eyebrow="Products"
            title="Premium, Export-Grade Ingredients"
            description="Curated selection sourced from trusted farms, processed with care, and delivered globally."
          />
        </Reveal>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {products.map((product, index) => (
              <Reveal key={product.id} delayMs={index * 80}>
                <Link
                  href={`/products/${product.slug}`}
                  className="group flex flex-col h-full rounded-2xl border border-forest-900/[0.08] bg-white overflow-hidden shadow-sm hover:shadow-[0_24px_64px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-500"
                >
                  {/* Image */}
                  <div className="relative h-52 bg-gradient-to-br from-forest-50 to-cream-100 flex items-center justify-center overflow-hidden">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover scale-[1.01] group-hover:scale-[1.06] transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <span className="text-5xl group-hover:scale-110 transition-transform duration-500">🌾</span>
                    )}

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* In Stock badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 border border-forest-900/[0.06] shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-forest-800">In Stock</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6">
                    <h3 className="text-base font-bold text-forest-900 mb-2 group-hover:text-forest-700 transition-colors duration-300 leading-tight">
                      {product.name}
                    </h3>
                    <p className="text-forest-900/60 text-sm leading-relaxed line-clamp-2 flex-1">
                      {product.description}
                    </p>

                    {/* CTA row */}
                    <div className="mt-5 pt-4 border-t border-forest-900/[0.06] flex items-center justify-between">
                      <span className="text-xs uppercase tracking-[0.2em] text-forest-700/70 font-semibold">
                        View Details
                      </span>
                      <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-forest-50 border border-forest-900/[0.08] group-hover:bg-gold-500 group-hover:border-gold-500 transition-all duration-300">
                        <ArrowRight className="w-3.5 h-3.5 text-forest-700 group-hover:text-forest-900 group-hover:translate-x-0.5 transition-all duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-forest-50 border border-forest-900/[0.08] mb-4">
                <Sparkles className="w-7 h-7 text-forest-400" />
              </div>
              <p className="text-forest-900/50 text-lg">Products will be available soon.</p>
            </div>
          </Reveal>
        )}

        <Reveal delayMs={120}>
          <div className="text-center">
            <Link
              href="/products"
              className="btn-shimmer inline-flex items-center justify-center gap-2.5 rounded-xl bg-forest-900 px-10 py-4 text-sm font-extrabold uppercase tracking-[0.14em] text-white hover:bg-forest-800 transition-all duration-300 shadow-[0_14px_40px_rgba(25,67,55,0.28)] hover:shadow-[0_18px_48px_rgba(25,67,55,0.38)] active:scale-[0.98]"
            >
              View All Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
