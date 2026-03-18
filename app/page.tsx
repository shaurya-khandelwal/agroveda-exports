import Hero from '@/components/Hero'
import CoreValues from '@/components/CoreValues'
import ProductShowcase from '@/components/ProductShowcase'
import Services from '@/components/Services'
import CTA from '@/components/CTA'

export const dynamic = 'force-dynamic'

const stats = [
  { value: '50+',  label: 'Countries Served' },
  { value: '200+', label: 'Global Partners'  },
  { value: '10+',  label: 'Years of Trust'   },
  { value: '99%',  label: 'Quality Rating'   },
]

export default function Home() {
  return (
    <div>
      <Hero />

      {/* Stats bridge — dark band that connects hero to the light sections cleanly */}
      <div className="relative bg-forest-900">
        {/* Subtle gold radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_100%_at_50%_0%,rgba(217,151,38,0.07),transparent_70%)] pointer-events-none" />
        {/* Bottom fade into the cream section */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-cream-50 pointer-events-none" />

        <div className="relative container mx-auto px-4 py-14">
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-y-10 gap-x-6">
            {stats.map((stat) => (
              <div key={stat.label} className="group text-center sm:text-left">
                <dt className="font-serif text-4xl md:text-5xl font-bold text-gold-300 group-hover:text-gold-200 transition-colors duration-300 leading-none">
                  {stat.value}
                </dt>
                <dd className="mt-2.5 text-[11px] uppercase tracking-[0.35em] text-white/45 font-medium">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <CoreValues />
      <ProductShowcase />
      <Services />
      <CTA />
    </div>
  )
}
