import { Award, Leaf, Shield, Heart } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'
import Reveal from '@/components/Reveal'

const values = [
  {
    icon: Award,
    title: 'Quality',
    description:
      'We maintain the highest standards in sourcing and processing our agricultural products.',
    accent: 'from-amber-500/20 to-gold-400/10',
    iconBg: 'bg-gradient-to-br from-amber-50 to-gold-100',
    iconColor: 'text-gold-600',
    border: 'hover:border-gold-300/50',
    number: '01',
  },
  {
    icon: Leaf,
    title: 'Sustainability',
    description:
      'Committed to sustainable farming practices that protect our environment for future generations.',
    accent: 'from-emerald-500/15 to-forest-400/10',
    iconBg: 'bg-gradient-to-br from-emerald-50 to-forest-100',
    iconColor: 'text-forest-700',
    border: 'hover:border-forest-400/50',
    number: '02',
  },
  {
    icon: Shield,
    title: 'Integrity',
    description:
      'Transparent business practices and honest relationships with all our partners.',
    accent: 'from-blue-500/10 to-indigo-400/8',
    iconBg: 'bg-gradient-to-br from-blue-50 to-indigo-100',
    iconColor: 'text-blue-700',
    border: 'hover:border-blue-300/40',
    number: '03',
  },
  {
    icon: Heart,
    title: 'Social Responsibility',
    description:
      'Supporting local farmers and communities while delivering global excellence.',
    accent: 'from-rose-500/12 to-pink-400/8',
    iconBg: 'bg-gradient-to-br from-rose-50 to-pink-100',
    iconColor: 'text-rose-700',
    border: 'hover:border-rose-300/40',
    number: '04',
  },
]

export default function CoreValues() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Rich background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream-50 via-white to-cream-100/60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(217,151,38,0.07),transparent)]" />

      <div className="relative container mx-auto px-4">
        <Reveal>
          <SectionHeading
            eyebrow="Values"
            title="Our Core Values"
            description="The principles that guide everything we do at Agroveda Exports — from farm to global market."
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Reveal key={index} delayMs={index * 80}>
              <div
                className={`group relative flex flex-col h-full rounded-2xl border border-forest-900/[0.08] bg-white/90 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden card-glow ${value.border}`}
              >
                {/* Gradient accent background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${value.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Top gold accent line */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-gold-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative p-7 flex flex-col h-full">
                  {/* Number */}
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${value.iconBg} border border-forest-900/[0.06] shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-400`}
                    >
                      <value.icon className={`w-6 h-6 ${value.iconColor}`} />
                    </div>
                    <span className="font-serif text-4xl font-bold text-forest-900/[0.06] group-hover:text-forest-900/10 transition-colors duration-300 leading-none">
                      {value.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-forest-900 mb-2.5 group-hover:text-forest-800 transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-forest-900/65 text-sm leading-relaxed flex-1">
                    {value.description}
                  </p>

                  {/* Bottom accent */}
                  <div className="mt-5 h-px w-0 group-hover:w-full bg-gradient-to-r from-gold-400/50 to-transparent transition-all duration-700 ease-out rounded-full" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
