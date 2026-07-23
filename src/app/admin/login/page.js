'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
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
    <div className="min-h-screen bg-[#F5F0EB] flex items-center justify-center p-6 sm:p-12 relative overflow-hidden select-none">
      
      {/* Background Ambient Blur Balls */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -bottom-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-[#0E4FB3]/[0.1] to-[#0797CE]/[0.02] blur-[130px]" />
        <div className="absolute -top-[10%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-[#E8A840]/[0.1] to-[#EDE8E2]/[0.02] blur-[130px]" />
      </div>

      <div className="max-w-[1280px] w-full bg-transparent relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        
        {/* Left Side: Form Content */}
        <div className="col-span-12 lg:col-span-6 flex flex-col justify-center min-h-[500px] pr-0 lg:pr-8">
          
          {/* Logo Branding */}
          <div className="mb-12">
            <h1 className="font-display font-black text-2xl sm:text-3xl text-neutral-900 tracking-tight m-0 select-none">
              fg lift<span className="text-[#E8A840]">.</span>
            </h1>
            <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest font-bold">
              System Control Portal
            </span>
          </div>

          {/* Form Header */}
          <div className="mb-8">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-neutral-900 tracking-tight leading-none m-0">
              Sign In
            </h2>
            <p className="font-sans text-sm text-neutral-500 mt-2 m-0">
              Access the administrative dashboard and CRM controls.
            </p>
          </div>

          {/* Error Message Alert */}
          {errorMsg && (
            <div className="bg-red-50 border border-red-100 text-red-700 font-mono text-xs px-5 py-3 rounded-2xl mb-6 leading-relaxed">
              {errorMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[9px] uppercase tracking-wider text-neutral-400 font-bold px-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered email"
                required
                disabled={isLoading}
                className="px-6 py-3.5 rounded-full border border-neutral-300 bg-white/70 font-sans text-sm text-neutral-900 outline-hidden focus:border-[#E8A840] focus:ring-1 focus:ring-[#E8A840] w-full transition-all disabled:opacity-50"
              />
            </div>

            <div className="flex flex-col gap-2 relative">
              <label className="font-mono text-[9px] uppercase tracking-wider text-neutral-400 font-bold px-1">
                Access Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your access password"
                  required
                  disabled={isLoading}
                  className="px-6 py-3.5 pr-12 rounded-full border border-neutral-300 bg-white/70 font-sans text-sm text-neutral-900 outline-hidden focus:border-[#E8A840] focus:ring-1 focus:ring-[#E8A840] w-full transition-all disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 cursor-pointer bg-transparent border-none p-0 outline-hidden"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 space-y-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-[#E8A840] hover:bg-[#d89730] text-black font-sans font-bold text-xs uppercase tracking-wider rounded-full transition-all duration-300 shadow-xs cursor-pointer border-none outline-hidden disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>

              <div className="text-center">
                <Link
                  href="/admin/forgot-password"
                  className="font-sans text-xs text-neutral-500 hover:text-neutral-800 transition-colors no-underline font-medium"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
          </form>

        </div>

        {/* Right Side: Architectural Skyscraper Showcase */}
        <div className="hidden lg:block lg:col-span-6 relative w-full h-[75vh] min-h-[550px]">
          <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border border-[#E8E2DA] shadow-md">
            <Image
              src="/images/fg-building.jpg"
              alt="FG Lifts Office Tower"
              fill
              priority
              className="object-cover object-center brightness-[0.88]"
              sizes="(max-width: 1024px) 0vw, 50vw"
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

      </div>
    </div>
  )
}
