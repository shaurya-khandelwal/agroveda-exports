'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, MessageCircle, Loader2, CheckCircle2, User, Phone } from 'lucide-react'

const enquirySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number is required'),
  message: z.string().optional(),
})

type EnquiryFormData = z.infer<typeof enquirySchema>

interface EnquiryFormProps {
  productId: string
  productName: string
}

export default function EnquiryForm({ productId, productName }: EnquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [whatsappLink, setWhatsappLink] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
  })

  const onSubmit = async (data: EnquiryFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, productId }),
      })

      if (response.ok) {
        const result = await response.json()
        setSubmitStatus('success')
        setWhatsappLink(result.whatsappLink)
        reset()
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative rounded-3xl border border-forest-900/[0.08] bg-white overflow-hidden shadow-sm">
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-forest-900 via-gold-500 to-forest-900" />

      <div className="p-8 md:p-10">
        {/* Heading */}
        <div className="mb-8">
          <p className="text-gold-600 uppercase tracking-[0.45em] text-[10px] font-semibold mb-2">
            Get in Touch
          </p>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-forest-900 leading-tight">
            Enquire About <span className="text-forest-700">{productName}</span>
          </h2>
          <p className="text-forest-900/50 text-sm mt-2 leading-relaxed">
            Fill in the form below and our team will get back to you within 24–48 hours.
          </p>
        </div>

        {/* Success state */}
        {submitStatus === 'success' && (
          <div className="mb-6 p-5 bg-emerald-50 border border-emerald-200/60 rounded-2xl flex items-start gap-4">
            <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-emerald-100 border border-emerald-200 inline-flex items-center justify-center mt-0.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-emerald-900 font-bold text-sm mb-1">Enquiry submitted successfully!</p>
              <p className="text-emerald-800/70 text-sm mb-4 leading-relaxed">
                We&apos;ll get back to you soon. You can also reach us directly on WhatsApp.
              </p>
              {whatsappLink && (
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shimmer inline-flex items-center gap-2 bg-gold-500 text-forest-900 px-5 py-2.5 rounded-xl font-extrabold uppercase tracking-[0.12em] text-xs hover:bg-gold-400 transition-all duration-300 shadow-[0_8px_24px_rgba(212,168,64,0.3)]"
                >
                  <MessageCircle className="w-4 h-4" />
                  Contact via WhatsApp
                </a>
              )}
            </div>
          </div>
        )}

        {/* Error state */}
        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200/60 rounded-2xl">
            <p className="text-red-800 text-sm font-medium">
              Something went wrong. Please try again or contact us directly.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name + Phone row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-[0.18em] text-forest-900/60 mb-2">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-forest-900/30" />
                <input
                  type="text"
                  id="name"
                  {...register('name')}
                  className="w-full pl-10 pr-4 py-3 border border-forest-900/[0.12] rounded-xl focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400/50 outline-none bg-cream-50/50 text-forest-900 placeholder:text-forest-900/30 text-sm transition-all duration-200"
                  placeholder="Your full name"
                />
              </div>
              {errors.name && (
                <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-[0.18em] text-forest-900/60 mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-forest-900/30" />
                <input
                  type="tel"
                  id="phone"
                  {...register('phone')}
                  className="w-full pl-10 pr-4 py-3 border border-forest-900/[0.12] rounded-xl focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400/50 outline-none bg-cream-50/50 text-forest-900 placeholder:text-forest-900/30 text-sm transition-all duration-200"
                  placeholder="+91-XXXXXXXXXX"
                />
              </div>
              {errors.phone && (
                <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.phone.message}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-[0.18em] text-forest-900/60 mb-2">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-forest-900/30" />
              <input
                type="email"
                id="email"
                {...register('email')}
                className="w-full pl-10 pr-4 py-3 border border-forest-900/[0.12] rounded-xl focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400/50 outline-none bg-cream-50/50 text-forest-900 placeholder:text-forest-900/30 text-sm transition-all duration-200"
                placeholder="your.email@example.com"
              />
            </div>
            {errors.email && (
              <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.email.message}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-[0.18em] text-forest-900/60 mb-2">
              Message <span className="text-forest-900/35 normal-case tracking-normal font-normal">(Optional)</span>
            </label>
            <textarea
              id="message"
              {...register('message')}
              rows={4}
              className="w-full px-4 py-3 border border-forest-900/[0.12] rounded-xl focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400/50 outline-none bg-cream-50/50 text-forest-900 placeholder:text-forest-900/30 text-sm transition-all duration-200 resize-none"
              placeholder="Tell us about your requirements, quantities, delivery destination..."
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-shimmer flex-1 flex items-center justify-center gap-2.5 bg-forest-900 text-white px-6 py-3.5 rounded-xl font-extrabold uppercase tracking-[0.12em] text-sm hover:bg-forest-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_8px_24px_rgba(22,53,34,0.3)]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting…
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4" />
                  Submit Enquiry
                </>
              )}
            </button>
            <a
              href={`https://wa.me/919876543210?text=Hello, I am interested in ${encodeURIComponent(productName)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shimmer flex-1 flex items-center justify-center gap-2.5 bg-gold-500 text-forest-900 px-6 py-3.5 rounded-xl font-extrabold uppercase tracking-[0.12em] text-sm hover:bg-gold-400 transition-all duration-300 shadow-[0_8px_24px_rgba(212,168,64,0.3)]"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}
