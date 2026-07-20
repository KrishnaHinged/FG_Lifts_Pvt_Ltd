'use client'

import { useState, useRef, useEffect } from 'react'
import { Mail, ArrowRight, Check, Loader2 } from 'lucide-react'

export default function NewsletterStrip() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const timerRef = useRef(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'Global Strip' }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setMessage(data.message || 'You\'re in!')
        setEmail('')
        // Reset after 5s
        if (timerRef.current) clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => { setStatus('idle'); setMessage('') }, 5000)
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong.')
      }
    } catch {
      setStatus('error')
      setMessage('Network error.')
    }
  }

  return (
    <div className="bg-fg-blue">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left text */}
        <div className="flex items-center gap-3">
          <Mail className="w-4 h-4 text-white/70 flex-shrink-0" />
          <span className="text-white text-sm font-medium">
            Subscribe to FG Lift insights — technical guides & product updates
          </span>
        </div>

        {/* Right form */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 flex-shrink-0">
          {status === 'success' ? (
            <div className="flex items-center gap-2 text-white/90 font-mono text-xs tracking-wider">
              <Check className="w-4 h-4" />
              {message}
            </div>
          ) : (
            <>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setStatus('idle') }}
                placeholder="your@email.com"
                required
                className="w-[200px] sm:w-[240px] px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-xs placeholder:text-white/40 outline-none focus:border-white/50 transition-colors"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex items-center gap-1.5 bg-white text-fg-blue px-4 py-2 rounded-full font-bold text-xs cursor-pointer border-none hover:bg-white/90 transition-colors disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="w-3 h-3" />
                  </>
                )}
              </button>
            </>
          )}
          {status === 'error' && message && (
            <span className="font-mono text-[10px] text-white/70">{message}</span>
          )}
        </form>
      </div>
    </div>
  )
}
