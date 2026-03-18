'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Menu, X, User, ChevronDown, ArrowRight, Leaf } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

interface NavProduct {
  id: string
  name: string
  slug: string
  description: string
}

// Product icon emoji mapping
const productEmoji: Record<string, string> = {
  turmeric: '🌿',
  ashwagandha: '🌱',
  moringa: '🍃',
  cumin: '🌾',
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)
  const [products, setProducts] = useState<NavProduct[]>([])
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { data: session } = useSession()

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fetch products for dropdown
  useEffect(() => {
    fetch('/api/products')
      .then((r) => r.json())
      .then((data: NavProduct[]) => {
        if (Array.isArray(data)) setProducts(data)
      })
      .catch(() => {})
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProductsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-forest-900 shadow-[0_4px_32px_rgba(0,0,0,0.3)] border-b border-white/[0.1]'
          : 'bg-forest-900/95 border-b border-white/[0.08]'
      } backdrop-blur-md`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link href="/" className="flex items-baseline gap-2.5 group">
            <span className="font-serif text-[1.85rem] tracking-tight text-white group-hover:text-white/90 transition-colors duration-300">
              Agri<span className="text-gold-300 group-hover:text-gold-200 transition-colors duration-300">veda</span>
            </span>
            <span className="hidden sm:inline text-[10px] uppercase tracking-[0.4em] text-white/65 pb-0.5 group-hover:text-white/85 transition-colors duration-300">
              Exports
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {/* Home */}
            <Link
              href="/"
              className="relative text-[11px] uppercase tracking-[0.2em] text-white/90 hover:text-white transition-colors duration-300 py-1 group"
            >
              Home
              <span className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-gold-400 to-gold-300 group-hover:w-full transition-all duration-300 ease-out rounded-full" />
            </Link>

            {/* Products dropdown */}
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <button
                className="relative flex items-center gap-1 text-[11px] uppercase tracking-[0.2em] text-white/90 hover:text-white transition-colors duration-300 py-1 group"
                onClick={() => setProductsOpen((v) => !v)}
                aria-haspopup="true"
                aria-expanded={productsOpen}
              >
                Products
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-300 ${productsOpen ? 'rotate-180' : ''}`}
                />
                <span className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-gold-400 to-gold-300 group-hover:w-full transition-all duration-300 ease-out rounded-full" />
              </button>

              {/* Dropdown panel */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 w-72 transition-all duration-300 origin-top ${
                  productsOpen
                    ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                }`}
              >
                <div className="rounded-2xl border border-white/[0.1] bg-forest-800/95 backdrop-blur-xl shadow-[0_24px_64px_rgba(0,0,0,0.4)] overflow-hidden">
                  {/* Header */}
                  <div className="px-4 pt-4 pb-3 border-b border-white/[0.06]">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-gold-400/80 font-semibold">
                      Our Products
                    </p>
                  </div>

                  {/* Product list */}
                  <div className="p-2">
                    {products.length > 0 ? (
                      products.map((product) => (
                        <Link
                          key={product.id}
                          href={`/products/${product.slug}`}
                          onClick={() => setProductsOpen(false)}
                          className="group flex items-center gap-3 rounded-xl px-3 py-3 hover:bg-white/[0.06] transition-all duration-200"
                        >
                          <span className="text-xl flex-shrink-0 w-8 text-center">
                            {productEmoji[product.slug] ?? '🌿'}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="text-white/90 text-sm font-semibold group-hover:text-white transition-colors duration-200 leading-none">
                              {product.name}
                            </div>
                            <div className="text-white/40 text-[11px] mt-1 truncate group-hover:text-white/55 transition-colors duration-200">
                              {product.description.split('\n')[0].slice(0, 48)}
                              {product.description.length > 48 ? '…' : ''}
                            </div>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-white/25 group-hover:text-gold-400 group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0" />
                        </Link>
                      ))
                    ) : (
                      <div className="flex items-center gap-3 px-3 py-3 text-white/40 text-sm">
                        <Leaf className="w-4 h-4" />
                        Loading products…
                      </div>
                    )}
                  </div>

                  {/* Footer link */}
                  <div className="px-4 py-3 border-t border-white/[0.06]">
                    <Link
                      href="/products"
                      onClick={() => setProductsOpen(false)}
                      className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-gold-400/70 hover:text-gold-300 transition-colors duration-200 group"
                    >
                      View All Products
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Services */}
            <Link
              href="/#services"
              className="relative text-[11px] uppercase tracking-[0.2em] text-white/90 hover:text-white transition-colors duration-300 py-1 group"
            >
              Services
              <span className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-gold-400 to-gold-300 group-hover:w-full transition-all duration-300 ease-out rounded-full" />
            </Link>

            {/* Contact */}
            <Link
              href="/#contact"
              className="relative text-[11px] uppercase tracking-[0.2em] text-white/90 hover:text-white transition-colors duration-300 py-1 group"
            >
              Contact
              <span className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-gold-400 to-gold-300 group-hover:w-full transition-all duration-300 ease-out rounded-full" />
            </Link>

            {session?.user.role === 'ADMIN' && (
              <Link
                href="/admin"
                className="relative text-[11px] uppercase tracking-[0.2em] text-white/90 hover:text-white transition-colors duration-300 py-1 group"
              >
                Admin
                <span className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-gold-400 to-gold-300 group-hover:w-full transition-all duration-300 ease-out rounded-full" />
              </Link>
            )}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <button
                onClick={() => signOut()}
                className="inline-flex items-center gap-2 rounded-lg border border-white/[0.12] bg-white/[0.05] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white hover:bg-white/[0.1] hover:border-white/25 transition-all duration-300"
              >
                <User className="h-3.5 w-3.5" />
                Sign Out
              </button>
            ) : (
              <Link
                href="/auth/signin"
                className="inline-flex items-center gap-2 rounded-lg border border-white/[0.12] bg-white/[0.05] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white hover:bg-white/[0.1] hover:border-white/25 transition-all duration-300"
              >
                <User className="h-3.5 w-3.5" />
                Sign In
              </Link>
            )}

            <Link
              href="/#contact"
              className="btn-shimmer inline-flex items-center justify-center rounded-xl bg-gold-500 px-6 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.16em] text-forest-900 hover:bg-gold-400 transition-all duration-300 shadow-[0_8px_24px_rgba(212,168,64,0.3)] hover:shadow-[0_12px_32px_rgba(212,168,64,0.45)] active:scale-[0.98]"
            >
              Get Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.05] p-2.5 text-white hover:bg-white/[0.1] transition-all duration-300"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span className={`transition-all duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'}`}>
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-400 ease-in-out ${
            isOpen ? 'max-h-[36rem] opacity-100 pb-6' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="mt-2 rounded-2xl border border-white/[0.08] bg-forest-900/90 backdrop-blur-sm p-3 space-y-1">
            <Link
              href="/"
              className="flex items-center px-3 py-2.5 rounded-xl text-[11px] uppercase tracking-[0.2em] text-white/80 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>

            {/* Mobile Products Accordion */}
            <div>
              <button
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[11px] uppercase tracking-[0.2em] text-white/80 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
                onClick={() => setMobileProductsOpen((v) => !v)}
              >
                Products
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${mobileProductsOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  mobileProductsOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="ml-3 mt-1 pl-3 border-l border-white/[0.08] space-y-1 pb-1">
                  {products.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
                      onClick={() => { setIsOpen(false); setMobileProductsOpen(false) }}
                    >
                      <span className="text-base">{productEmoji[product.slug] ?? '🌿'}</span>
                      <span className="text-[11px] uppercase tracking-[0.15em]">{product.name}</span>
                    </Link>
                  ))}
                  <Link
                    href="/products"
                    className="flex items-center gap-2 px-3 py-2 text-[10px] uppercase tracking-[0.25em] text-gold-400/70 hover:text-gold-300 transition-colors duration-200"
                    onClick={() => { setIsOpen(false); setMobileProductsOpen(false) }}
                  >
                    View All
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/#services"
              className="flex items-center px-3 py-2.5 rounded-xl text-[11px] uppercase tracking-[0.2em] text-white/80 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/#contact"
              className="flex items-center px-3 py-2.5 rounded-xl text-[11px] uppercase tracking-[0.2em] text-white/80 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            {session?.user.role === 'ADMIN' && (
              <Link
                href="/admin"
                className="flex items-center px-3 py-2.5 rounded-xl text-[11px] uppercase tracking-[0.2em] text-white/80 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                Admin
              </Link>
            )}

            <div className="pt-3 mt-2 border-t border-white/[0.08] flex flex-col gap-3">
              {session ? (
                <button
                  onClick={() => { signOut(); setIsOpen(false) }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.05] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/90 hover:bg-white/[0.1] transition-all duration-300"
                >
                  <User className="h-3.5 w-3.5" />
                  Sign Out
                </button>
              ) : (
                <Link
                  href="/auth/signin"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.05] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/90 hover:bg-white/[0.1] transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="h-3.5 w-3.5" />
                  Sign In
                </Link>
              )}
              <Link
                href="/#contact"
                className="btn-shimmer inline-flex items-center justify-center rounded-xl bg-gold-500 px-6 py-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-forest-900 hover:bg-gold-400 transition-all duration-300 shadow-[0_8px_24px_rgba(212,168,64,0.3)]"
                onClick={() => setIsOpen(false)}
              >
                Get Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
