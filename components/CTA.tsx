'use client'

import { Mail, MessageCircle, MapPin, Clock, Award } from 'lucide-react'
import Reveal from '@/components/Reveal'

const highlights = [
  { icon: Award, label: 'ISO Certified', sub: 'Quality Assured' },
  { icon: MapPin, label: '50+ Countries', sub: 'Global Reach' },
  { icon: Clock, label: '24–48 hrs', sub: 'Response Time' },
]

export default function CTA() {
  const whatsappNumber = '919876543210'
  const emailAddress = 'shauryakhandelwal9@gmail.com'
  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailAddress)}&su=${encodeURIComponent('Enquiry from Agroveda Exports Website')}&body=${encodeURIComponent('Hello,\n\nI am interested in learning more about Agroveda Exports products.\n\nThank you!')}`

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      {/* Dark forest background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-forest-900 via-[#1a3d29] to-forest-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(217,151,38,0.1),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_0%_100%,rgba(56,130,80,0.2),transparent_65%)]" />
      <div className="absolute inset-0 stripe-pattern" />

      {/* Floating orbs */}
      <div className="absolute top-12 right-[10%] w-72 h-72 rounded-full bg-gold-400/[0.05] blur-3xl pointer-events-none animate-float" />
      <div className="absolute bottom-8 left-[8%] w-56 h-56 rounded-full bg-forest-400/[0.08] blur-2xl pointer-events-none animate-float-alt" />

      {/* Rotating decorative rings */}
      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full border border-white/[0.03] animate-spin-slow pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-56 h-56 rounded-full border border-gold-400/[0.05] animate-spin-slow pointer-events-none" style={{ animationDirection: 'reverse' }} />

      <div className="relative container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">

          {/* Eyebrow */}
          <Reveal>
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="inline-block h-px w-8 bg-gradient-to-r from-transparent to-gold-400/70 rounded-full" />
              <p className="text-gold-300/85 uppercase tracking-[0.5em] text-[10px] sm:text-xs font-semibold">
                Contact
              </p>
              <span className="inline-block h-px w-8 bg-gradient-to-l from-transparent to-gold-400/70 rounded-full" />
            </div>
          </Reveal>

          <Reveal delayMs={60}>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-white leading-tight tracking-tight">
              Ready to Start{' '}
              <span className="gradient-text-gold">Exporting?</span>
            </h2>
          </Reveal>

          <Reveal delayMs={120}>
            <p className="mt-5 text-lg md:text-xl text-white/60 leading-relaxed">
              Have questions about our products or services? Our team is ready to assist
              you with a personalised export solution.
            </p>
          </Reveal>

          {/* Highlight badges */}
          <Reveal delayMs={180}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-3 backdrop-blur-sm hover:bg-white/[0.07] hover:border-white/[0.14] transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gold-500/10 border border-gold-400/20 inline-flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-gold-300" />
                  </div>
                  <div className="text-left">
                    <div className="text-white/90 text-sm font-semibold leading-none">{item.label}</div>
                    <div className="text-white/40 text-[10px] uppercase tracking-[0.2em] mt-0.5">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* CTA Buttons */}
          <Reveal delayMs={240}>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={gmailLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shimmer flex items-center justify-center gap-2.5 bg-gold-500 text-forest-900 px-8 py-4 rounded-xl font-extrabold uppercase tracking-[0.14em] text-sm hover:bg-gold-400 transition-all duration-300 shadow-[0_16px_48px_rgba(212,168,64,0.35)] hover:shadow-[0_20px_60px_rgba(212,168,64,0.5)] active:scale-[0.98]"
              >
                <Mail className="w-4 h-4" />
                Email Us
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}?text=Hello, I am interested in Agroveda Exports products`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 bg-white/[0.06] border border-white/[0.15] text-white px-8 py-4 rounded-xl font-extrabold uppercase tracking-[0.14em] text-sm hover:bg-white/[0.12] hover:border-white/[0.28] transition-all duration-300 backdrop-blur-sm active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </a>
            </div>
          </Reveal>

          {/* Divider */}
          <Reveal delayMs={300}>
            <div className="mt-14 pt-8 border-t border-white/[0.08]">
              <p className="text-white/30 text-xs uppercase tracking-[0.45em]">
                Agroveda Exports · Premium Agricultural Products Since 2014
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
