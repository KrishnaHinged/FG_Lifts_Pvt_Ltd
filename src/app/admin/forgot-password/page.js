'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Loader2 } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [feedback, setFeedback] = useState({ success: false, message: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFeedback({ success: false, message: '' })
    setIsLoading(true)

    // Simulate reset request / staging flow
    setTimeout(() => {
      setIsLoading(false)
      setFeedback({
        success: true,
        message: 'Password reset link has been dispatched to your email address.'
      })
    }, 1200)
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
              Forgot password
            </h2>
            <p className="font-sans text-sm text-neutral-500 mt-2 m-0">
              Enter your registered email to reset your password.
            </p>
          </div>

          {/* Feedback Alert */}
          {feedback.message && (
            <div className={`border font-mono text-xs px-5 py-3 rounded-2xl mb-6 leading-relaxed ${
              feedback.success 
                ? 'bg-emerald-50 border-emerald-100 text-emerald-700' 
                : 'bg-red-50 border-red-100 text-red-700'
            }`}>
              {feedback.message}
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
                    Submitting...
                  </>
                ) : (
                  'Submit'
                )}
              </button>

              <div className="text-center">
                <Link
                  href="/admin/login"
                  className="font-sans text-xs text-neutral-500 hover:text-neutral-800 transition-colors no-underline font-medium"
                >
                  Back to login
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
