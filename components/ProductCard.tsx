import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface Product {
  id: string
  name: string
  slug: string
  description: string
  imageUrl?: string | null
  price?: number | null
  unit?: string | null
}

const productEmoji: Record<string, string> = {
  turmeric: '🌿',
  ashwagandha: '🌱',
  moringa: '🍃',
  cumin: '🌾',
}

const productGradient: Record<string, string> = {
  turmeric: 'from-amber-900/80 to-forest-900',
  ashwagandha: 'from-forest-900 to-emerald-950',
  moringa: 'from-emerald-950 to-forest-900',
  cumin: 'from-yellow-950 to-forest-900',
}

export default function ProductCard({ product }: { product: Product }) {
  const emoji = productEmoji[product.slug] ?? '🌾'
  const gradient = productGradient[product.slug] ?? 'from-forest-900 to-forest-800'
  const shortDesc = product.description.split('\n')[0]

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col h-full rounded-2xl border border-forest-900/[0.08] bg-white overflow-hidden shadow-sm hover:shadow-[0_24px_64px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-500"
    >
      {/* Image / placeholder */}
      <div className={`relative h-52 bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}>
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover scale-[1.01] group-hover:scale-[1.06] transition-transform duration-700 ease-out"
          />
        ) : (
          <>
            {/* Decorative rings */}
            <div className="absolute w-40 h-40 rounded-full border border-white/[0.06] animate-spin-slow" />
            <div className="absolute w-24 h-24 rounded-full border border-white/[0.08]" />
            <span className="relative text-5xl z-10 group-hover:scale-110 transition-transform duration-500 drop-shadow-lg">
              {emoji}
            </span>
          </>
        )}

        {/* Top-right badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-black/30 backdrop-blur-sm px-3 py-1 border border-white/[0.1]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90">In Stock</span>
        </div>

{/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-base font-bold text-forest-900 mb-2 group-hover:text-forest-700 transition-colors duration-300 leading-tight">
          {product.name}
        </h3>
        <p className="text-forest-900/55 text-sm leading-relaxed line-clamp-2 flex-1">
          {shortDesc}
        </p>

        {/* Footer */}
        <div className="mt-5 pt-4 border-t border-forest-900/[0.06] flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.25em] text-forest-700/60 font-semibold">
            View Details
          </span>
          <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-forest-50 border border-forest-900/[0.08] group-hover:bg-gold-500 group-hover:border-gold-500 transition-all duration-300">
            <ArrowRight className="w-3.5 h-3.5 text-forest-700 group-hover:text-forest-900 group-hover:translate-x-0.5 transition-all duration-300" />
          </div>
        </div>
      </div>
    </Link>
  )
}
