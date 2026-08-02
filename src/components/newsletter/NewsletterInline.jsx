'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, ArrowRight, Check, Loader2 } from 'lucide-react'
import { fadeUp } from '@/lib/motion'

export default function NewsletterInline({ compact = false }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'Blog Inline' }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setMessage(data.message || 'Subscribed!')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong.')
      }
    } catch {
      setStatus('error')
      setMessage('Network error. Try again.')
    }
  }

  if (compact) {
    return (
      <div className="bg-fg-blue/5 border border-fg-blue/15 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-3">
          <Mail className="w-4 h-4 text-fg-blue" />
          <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-fg-blue font-bold">
            Newsletter
          </span>
        </div>
        <p className="text-fg-body text-sm leading-relaxed mb-4">
          Get elevator insights delivered to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setStatus('idle') }}
            placeholder="you@company.com"
            required
            className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-fg-border text-sm text-fg-dark placeholder:text-fg-muted/60 outline-none focus:border-fg-blue transition-colors"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-fg-blue text-white px-4 py-2.5 rounded-xl font-medium text-sm cursor-pointer border-none hover:bg-fg-blue/90 transition-colors disabled:opacity-50 flex items-center justify-center"
          >
            {status === 'loading' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : status === 'success' ? (
              <Check className="w-4 h-4" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )}
          </button>
        </form>
        {message && (
          <p className={`font-mono text-[10px] mt-2 ${status === 'success' ? 'text-green-600' : 'text-fg-red'}`}>
            {message}
          </p>
        )}
      </div>
    )
  }

  return (
    <motion.div
      {...fadeUp}
      className="bg-fg-dark rounded-3xl p-8 sm:p-12 lg:p-16 text-center overflow-hidden relative"
    >
      {/* Noise texture */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
      
      {/* Gradient accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-fg-blue/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-fg-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase text-fg-blue font-bold mb-4">
          <Mail className="w-4 h-4" />
          Stay Informed
        </span>

        <h3 className="font-display text-2xl sm:text-3xl text-fg-cream mb-4 leading-tight">
          Elevator Industry Insights,<br />Delivered Monthly
        </h3>

        <p className="text-fg-cream/60 text-sm sm:text-base leading-relaxed max-w-lg mx-auto mb-8">
          Technical guides, project case studies, and product updates from
          FG Lift&apos;s engineering team. No spam, unsubscribe anytime.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setStatus('idle') }}
            placeholder="your@email.com"
            required
            className="flex-1 px-5 py-3 rounded-full bg-white/5 border border-white/15 text-fg-cream text-sm placeholder:text-fg-cream/30 outline-none focus:border-fg-blue transition-colors duration-200"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="inline-flex items-center justify-center gap-2 bg-fg-blue text-white px-6 py-3 rounded-full font-medium text-sm cursor-pointer border-none hover:bg-fg-blue/90 hover:shadow-blue transition-all duration-300 disabled:opacity-50"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Subscribing...
              </>
            ) : status === 'success' ? (
              <>
                <Check className="w-4 h-4" />
                Subscribed!
              </>
            ) : (
              <>
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {message && (
          <p className={`font-mono text-xs mt-4 ${status === 'success' ? 'text-green-400' : 'text-fg-red'}`}>
            {message}
          </p>
        )}

        <p className="font-mono text-[10px] text-fg-cream/30 mt-6 tracking-wider">
          JOIN 1,200+ SUBSCRIBERS · NO SPAM, EVER
        </p>
      </div>
    </motion.div>
  )
}
