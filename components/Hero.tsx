import Link from 'next/link'
import Reveal from '@/components/Reveal'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden text-white">
      {/* Background image with Ken Burns */}
      <div className="absolute inset-0 hero-kenburns bg-no-repeat bg-[image:url('/hero-farm.jpg'),url('/hero-farm.svg')] bg-[position:center,center] bg-[size:cover,cover]" />

      {/* Layered gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-forest-900/80 via-forest-900/65 to-forest-900/85" />
      <div className="absolute inset-0 bg-[radial-gradient(1100px_700px_at_-5%_-10%,rgba(217,151,38,0.2),transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(600px_600px_at_100%_100%,rgba(34,90,58,0.25),transparent_65%)]" />

      {/* Diagonal stripe texture */}
      <div className="absolute inset-0 stripe-pattern" />

      {/* Floating decorative orbs */}
      <div
        className="absolute top-1/4 right-[12%] w-96 h-96 rounded-full bg-gold-400/[0.06] blur-3xl pointer-events-none animate-float"
        style={{ animationDuration: '11s' }}
      />
      <div
        className="absolute top-[55%] right-[5%] w-56 h-56 rounded-full bg-gold-300/[0.08] blur-2xl pointer-events-none animate-float-alt"
      />
      <div
        className="absolute bottom-1/3 left-[8%] w-72 h-72 rounded-full bg-forest-500/[0.08] blur-3xl pointer-events-none animate-float"
        style={{ animationDelay: '4s', animationDuration: '13s' }}
      />

      <div className="container mx-auto px-4">
        <div className="relative flex min-h-[calc(100vh-5rem)] items-center py-20 md:py-28">
          <div className="max-w-4xl w-full">

            {/* Eyebrow with pulsing dot */}
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-block w-2.5 h-2.5 flex-shrink-0 rounded-full bg-gold-400 animate-pulse-ring" />
                <p className="text-gold-200/90 uppercase tracking-[0.45em] text-xs sm:text-sm font-medium">
                  Premium Indian Agro Exports
                </p>
              </div>
            </Reveal>

            {/* Headline */}
            <Reveal delayMs={80}>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-[5rem] leading-[1.04] tracking-tight">
                From India&apos;s Finest Farms
                <span className="mt-2 flex flex-col">
                  <span className="text-gold-300">To The World</span>
                  <span
                    className="mt-3 h-[3px] w-28 rounded-full bg-gradient-to-r from-gold-400 via-gold-300 to-transparent animate-draw-line"
                    style={{ transformOrigin: 'left' }}
                  />
                </span>
              </h1>
            </Reveal>

            {/* Body copy */}
            <Reveal delayMs={150}>
              <p className="mt-8 max-w-xl text-base sm:text-lg md:text-xl text-white/80 leading-relaxed">
                Agroveda Exports delivers premium turmeric, ashwagandha, moringa
                &amp; cumin — sourced with integrity, exported with excellence.
              </p>
            </Reveal>

            {/* CTA Buttons */}
            <Reveal delayMs={220}>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/products"
                  className="btn-shimmer inline-flex items-center justify-center gap-2.5 rounded-xl bg-gold-500 px-8 py-4 text-sm font-extrabold uppercase tracking-[0.14em] text-forest-900 hover:bg-gold-400 transition-all duration-300 shadow-[0_16px_48px_rgba(212,168,64,0.35)] hover:shadow-[0_20px_60px_rgba(212,168,64,0.5)] active:scale-[0.98]"
                >
                  Explore Products
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-white/25 bg-white/[0.07] px-8 py-4 text-sm font-extrabold uppercase tracking-[0.14em] text-white hover:bg-white/[0.14] hover:border-white/40 transition-all duration-300 backdrop-blur-sm active:scale-[0.98]"
                >
                  Request Quote
                </Link>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  )
}
