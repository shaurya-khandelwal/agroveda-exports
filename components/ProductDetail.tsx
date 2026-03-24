import Link from 'next/link'
import { ArrowLeft, CheckCircle2, Package, Globe, Award, Clock } from 'lucide-react'

interface Product {
  id: string
  name: string
  description: string
  imageUrl?: string | null
  price?: number | null
  unit?: string | null
  inStock: boolean
  slug?: string
}

const productEmoji: Record<string, string> = {
  turmeric: '🌿',
  ashwagandha: '🌱',
  moringa: '🍃',
  cumin: '🌾',
}

const productGradient: Record<string, string> = {
  turmeric: 'from-amber-900/90 to-forest-900',
  ashwagandha: 'from-forest-900 to-emerald-950',
  moringa: 'from-emerald-950 to-forest-900',
  cumin: 'from-yellow-950 to-forest-900',
}

const highlights = [
  { icon: Award, label: 'ISO Certified', sub: 'Quality Assured' },
  { icon: Globe, label: 'Export Ready', sub: 'Global Markets' },
  { icon: Package, label: 'Bulk Orders', sub: 'MOQ Flexible' },
  { icon: Clock, label: '7–14 Days', sub: 'Lead Time' },
]

export default function ProductDetail({ product }: { product: Product }) {
  const slug = product.slug ?? product.name.toLowerCase().replace(/\s+/g, '-')
  const emoji = productEmoji[slug] ?? '🌾'
  const gradient = productGradient[slug] ?? 'from-forest-900 to-forest-800'

  // Parse description into sections
  const lines = product.description.split('\n').map((l) => l.trim()).filter(Boolean)
  const intro: string[] = []
  const sections: { title: string; items: string[] }[] = []
  let current: { title: string; items: string[] } | null = null

  for (const line of lines) {
    if (line.endsWith(':') && line.length < 60) {
      if (current) sections.push(current)
      current = { title: line.slice(0, -1), items: [] }
    } else if (line.startsWith('- ') && current) {
      current.items.push(line.slice(2))
    } else if (!current) {
      intro.push(line)
    } else {
      // standalone line in a section
      current.items.push(line)
    }
  }
  if (current) sections.push(current)

  return (
    <div>
      {/* Back link */}
      <div className="mb-8">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-forest-900/50 hover:text-forest-900 text-sm font-medium transition-colors duration-200 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
          Back to Products
        </Link>
      </div>

      {/* Main card */}
      <div className="rounded-3xl border border-forest-900/[0.08] bg-white overflow-hidden shadow-sm">

        {/* Hero image row */}
        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* Left: image / placeholder */}
          <div className={`relative min-h-72 md:min-h-[420px] bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}>
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover absolute inset-0"
              />
            ) : (
              <>
                <div className="absolute w-64 h-64 rounded-full border border-white/[0.05] animate-spin-slow" />
                <div className="absolute w-40 h-40 rounded-full border border-white/[0.07]" />
                <div className="absolute w-20 h-20 rounded-full bg-white/[0.04]" />
                <span className="relative text-8xl z-10 drop-shadow-2xl select-none">{emoji}</span>
              </>
            )}

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-forest-900/30 via-transparent to-transparent" />

            {/* Stock badge */}
            <div className="absolute top-5 left-5">
              {product.inStock ? (
                <div className="flex items-center gap-2 rounded-full bg-black/30 backdrop-blur-sm px-4 py-2 border border-white/[0.1]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">In Stock</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 rounded-full bg-black/30 backdrop-blur-sm px-4 py-2 border border-white/[0.1]">
                  <span className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">Out of Stock</span>
                </div>
              )}
            </div>
          </div>

          {/* Right: info */}
          <div className="p-8 md:p-10 flex flex-col justify-center">
            <p className="text-gold-600 uppercase tracking-[0.45em] text-[10px] font-semibold mb-3">
              Premium Export Grade
            </p>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-forest-900 tracking-tight mb-4 leading-tight">
              {product.name}
            </h1>


            {/* Intro paragraph */}
            {intro.length > 0 && (
              <p className="text-forest-900/70 text-sm leading-relaxed mb-6">
                {intro.join(' ')}
              </p>
            )}

            {/* Highlight grid */}
            <div className="grid grid-cols-2 gap-3">
              {highlights.map((h) => (
                <div
                  key={h.label}
                  className="flex items-center gap-2.5 rounded-xl border border-forest-900/[0.07] bg-forest-50/50 px-3 py-2.5"
                >
                  <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-gold-500/10 border border-gold-400/20 inline-flex items-center justify-center">
                    <h.icon className="w-3.5 h-3.5 text-gold-600" />
                  </div>
                  <div>
                    <div className="text-forest-900 text-xs font-bold leading-none">{h.label}</div>
                    <div className="text-forest-900/45 text-[10px] uppercase tracking-[0.15em] mt-0.5">{h.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-forest-900/[0.08] to-transparent" />

        {/* Description sections */}
        <div className="p-8 md:p-10">
          {sections.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {sections.map((sec) => (
                <div key={sec.title}>
                  <h3 className="font-serif text-lg font-bold text-forest-900 mb-4 flex items-center gap-2">
                    <span className="inline-block w-1 h-5 rounded-full bg-gold-400" />
                    {sec.title}
                  </h3>
                  <ul className="space-y-2.5">
                    {sec.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-forest-900/70 text-sm leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-forest-900/70 text-base leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
