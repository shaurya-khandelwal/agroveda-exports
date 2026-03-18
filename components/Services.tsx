import { Globe, Package, FileText, Users } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'
import Reveal from '@/components/Reveal'

const services = [
  {
    icon: Globe,
    title: 'Agro-Products Export',
    description:
      'Global export services for premium agricultural products with full documentation and compliance support.',
    number: '01',
    highlight: 'rgba(217,151,38,0.12)',
  },
  {
    icon: Package,
    title: 'Quality Assurance',
    description:
      'Rigorous quality control and testing to ensure all products meet international standards.',
    number: '02',
    highlight: 'rgba(56,130,80,0.12)',
  },
  {
    icon: FileText,
    title: 'Custom Packaging',
    description:
      'Tailored packaging solutions to meet your specific requirements and branding needs.',
    number: '03',
    highlight: 'rgba(217,151,38,0.12)',
  },
  {
    icon: Users,
    title: 'Partnership Programs',
    description:
      'Collaborative opportunities for distributors and partners worldwide.',
    number: '04',
    highlight: 'rgba(56,130,80,0.12)',
  },
]

export default function Services() {
  return (
    <section id="services" className="relative py-24 overflow-hidden">
      {/* Dark forest background */}
      <div className="absolute inset-0 bg-gradient-to-br from-forest-900 via-forest-800 to-forest-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_80%_20%,rgba(217,151,38,0.1),transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_10%_80%,rgba(56,130,80,0.15),transparent_60%)]" />
      <div className="absolute inset-0 stripe-pattern" />

      {/* Decorative rotating ring */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border border-white/[0.04] animate-spin-slow pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full border border-gold-500/[0.06] animate-spin-slow pointer-events-none" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />

      <div className="relative container mx-auto px-4">
        <Reveal>
          <SectionHeading
            eyebrow="Services"
            title="Export-Ready Services"
            description="Comprehensive solutions for sourcing, quality, packaging, and global dispatch."
            light
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, index) => (
            <Reveal key={index} delayMs={index * 80}>
              <div className="group relative flex flex-col h-full rounded-2xl border border-white/[0.07] bg-white/[0.04] hover:bg-white/[0.08] transition-all duration-500 overflow-hidden backdrop-blur-sm hover:border-white/[0.15] hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:-translate-y-1.5">

                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${service.highlight}, transparent)` }}
                />

                <div className="relative p-7 flex flex-col h-full">
                  {/* Top row: icon + number */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="relative">
                      {/* Glow ring behind icon */}
                      <div className="absolute -inset-2 rounded-2xl bg-gold-400/[0.08] blur-md opacity-0 group-hover:opacity-100 animate-glow-pulse transition-opacity duration-500" />
                      <div className="relative inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/[0.08] border border-white/[0.1] group-hover:bg-white/[0.14] group-hover:border-white/[0.2] transition-all duration-400">
                        <service.icon className="w-5 h-5 text-gold-300 group-hover:text-gold-200 transition-colors duration-300" />
                      </div>
                    </div>
                    <span className="font-serif text-4xl font-bold text-white/[0.06] group-hover:text-white/10 transition-colors duration-300 leading-none">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white/90 mb-3 group-hover:text-white transition-colors duration-300 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed flex-1 group-hover:text-white/65 transition-colors duration-400">
                    {service.description}
                  </p>

                  {/* Bottom accent line */}
                  <div className="mt-6 h-px w-0 group-hover:w-full bg-gradient-to-r from-gold-400/60 to-transparent transition-all duration-700 ease-out rounded-full" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom tagline */}
        <Reveal delayMs={200}>
          <div className="mt-14 text-center">
            <p className="text-white/40 text-sm uppercase tracking-[0.4em]">
              Trusted by partners across 50+ countries
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
