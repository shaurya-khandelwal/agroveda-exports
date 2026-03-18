'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid email or password')
      } else {
        router.push('/admin')
        router.refresh()
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-100 via-white to-white flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-baseline gap-3">
            <span className="font-serif text-3xl tracking-tight text-forest-900">
              Agri<span className="text-gold-600">veda</span>
            </span>
            <span className="text-xs uppercase tracking-[0.35em] text-forest-900/60">
              Exports
            </span>
          </Link>
          <h2 className="mt-6 font-serif text-3xl md:text-4xl font-bold text-forest-900">
            Admin Sign In
          </h2>
          <p className="mt-2 text-sm text-forest-900/70">
            Access the dashboard to manage products and enquiries.
          </p>
        </div>

        <div className="rounded-2xl border border-forest-900/10 bg-white shadow-sm p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-forest-900/80 mb-2">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-3 border border-forest-900/15 rounded-xl placeholder-forest-900/40 text-forest-900 focus:outline-none focus:ring-2 focus:ring-gold-400/60 focus:border-transparent"
                placeholder="admin@agrovedaexports.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-forest-900/80 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-3 border border-forest-900/15 rounded-xl placeholder-forest-900/40 text-forest-900 focus:outline-none focus:ring-2 focus:ring-gold-400/60 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full inline-flex items-center justify-center py-3.5 px-4 text-sm font-extrabold uppercase tracking-[0.14em] rounded-xl text-white bg-forest-900 hover:bg-forest-800 focus:outline-none focus:ring-2 focus:ring-gold-400/60 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </div>

          <p className="pt-4 text-xs text-center text-forest-900/60">
            Protected area for administrators only.
          </p>
        </form>
        </div>
      </div>
    </div>
  )
}
