'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  let redirectPath = searchParams.get('redirect') || '/admin/dashboard'
  if (redirectPath === '/admin') {
    redirectPath = '/admin/dashboard'
  }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        router.push(redirectPath)
        // Force refresh to reload layouts
        router.refresh()
      } else {
        setErrorMsg('Invalid email or password.')
      }
    } catch {
      setErrorMsg('Network error. Try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-[#111827] min-h-screen flex items-center justify-center p-4 w-full">
      <div className="bg-white rounded-2xl p-8 sm:p-10 w-full max-w-md shadow-2xl border border-gray-100 flex flex-col select-none">
        
        {/* Top Branding */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-fg-blue flex items-center justify-center mx-auto mb-4">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" className="w-6 h-6 stroke-white">
              <rect x="4" y="2" width="16" height="20" rx="3" />
              <path d="M9 12L12 8L15 12" />
              <path d="M12 8V16" />
            </svg>
          </div>
          <h2 className="font-sans font-bold text-gray-900 text-xl tracking-tight leading-none mb-1">
            FG Lift Admin
          </h2>
          <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest font-bold">
            System Control Portal
          </span>
        </div>

        {/* Error Feedback */}
        {errorMsg && (
          <div className="bg-red-50 border border-red-100 text-red-700 font-mono text-xs px-4 py-2.5 rounded-xl mb-6 leading-relaxed">
            {errorMsg}
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">
              Account Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@company.com"
              required
              disabled={isLoading}
              className="px-4 py-3 rounded-xl border border-gray-200 bg-white font-sans text-sm text-gray-900 outline-none focus:border-fg-blue w-full disabled:opacity-50"
            />
          </div>

          <div className="flex flex-col gap-1.5 relative">
            <label className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">
              Access Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={isLoading}
                className="px-4 py-3 pr-10 rounded-xl border border-gray-200 bg-white font-sans text-sm text-gray-900 outline-none focus:border-fg-blue w-full disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer bg-transparent border-none p-0 outline-none"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-fg-blue text-white py-3 rounded-xl font-sans font-bold text-sm shadow-sm hover:shadow-md hover:bg-fg-blue/90 cursor-pointer border-none outline-none disabled:opacity-50 flex items-center justify-center gap-2 mt-6"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </button>

        </form>

      </div>
    </div>
  )
}
