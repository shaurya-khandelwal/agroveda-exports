import Link from 'next/link'
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'

const quickLinks = [
  { href: '/products', label: 'Our Products' },
  { href: '/#services', label: 'Services' },
  { href: '/#contact', label: 'Contact Us' },
]

const products = [
  { href: '/products', label: 'Turmeric' },
  { href: '/products', label: 'Ashwagandha' },
  { href: '/products', label: 'Moringa' },
  { href: '/products', label: 'Cumin' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest-900 to-[#0f2318]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_20%_0%,rgba(217,151,38,0.07),transparent_65%)]" />
      <div className="absolute inset-0 stripe-pattern" />

      {/* Gradient top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />

      <div className="relative container mx-auto px-4">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-16">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4 group">
              <h3 className="font-serif text-3xl font-bold tracking-tight text-white group-hover:text-white/90 transition-colors duration-300">
                Agri<span className="text-gold-300 group-hover:text-gold-200 transition-colors duration-300">veda</span>
                <span className="ml-2.5 text-white/40 text-sm font-sans uppercase tracking-[0.35em] font-normal">
                  Exports
                </span>
              </h3>
            </Link>
            <p className="text-white/55 text-sm leading-relaxed mb-6">
              Delivering premium quality agricultural products to global markets.
              Your trusted partner in agricultural exports since 2014.
            </p>

            {/* Quality badge */}
            <div className="inline-flex items-center gap-2 rounded-lg border border-gold-400/20 bg-gold-400/[0.05] px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse-ring flex-shrink-0" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold-300/80 font-medium">
                ISO 9001 Certified
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] font-extrabold uppercase tracking-[0.35em] text-white/40 mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1.5 text-white/65 hover:text-white text-sm transition-colors duration-300"
                  >
                    <span className="inline-block w-0 group-hover:w-3 h-px bg-gold-400 transition-all duration-300 rounded-full flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-[10px] font-extrabold uppercase tracking-[0.35em] text-white/40 mb-5">
              Products
            </h4>
            <ul className="space-y-3">
              {products.map((product) => (
                <li key={product.label}>
                  <Link
                    href={product.href}
                    className="group flex items-center gap-1.5 text-white/65 hover:text-white text-sm transition-colors duration-300"
                  >
                    <span className="inline-block w-0 group-hover:w-3 h-px bg-gold-400 transition-all duration-300 rounded-full flex-shrink-0" />
                    {product.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] font-extrabold uppercase tracking-[0.35em] text-white/40 mb-5">
              Get in Touch
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:shauryakhandelwal9@gmail.com"
                  className="group flex items-start gap-3 text-white/65 hover:text-white text-sm transition-colors duration-300"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.07] inline-flex items-center justify-center group-hover:bg-gold-500/10 group-hover:border-gold-400/20 transition-all duration-300 mt-0.5">
                    <Mail className="w-3.5 h-3.5 text-white/50 group-hover:text-gold-300 transition-colors duration-300" />
                  </div>
                  <span className="leading-relaxed break-all">shauryakhandelwal9@gmail.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-white/55 text-sm">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.07] inline-flex items-center justify-center mt-0.5">
                    <Phone className="w-3.5 h-3.5 text-white/50" />
                  </div>
                  <span className="leading-relaxed">+91-XXXXX-XXXXX</span>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3 text-white/55 text-sm">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.07] inline-flex items-center justify-center mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-white/50" />
                  </div>
                  <span className="leading-relaxed">India</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.07] py-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/35 text-xs">
            &copy; {new Date().getFullYear()} Agroveda Exports. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/products" className="text-white/30 hover:text-white/60 text-xs uppercase tracking-[0.25em] transition-colors duration-300">
              Products
            </Link>
            <Link href="/#contact" className="text-white/30 hover:text-white/60 text-xs uppercase tracking-[0.25em] transition-colors duration-300">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
