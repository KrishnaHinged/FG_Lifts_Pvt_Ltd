'use client'

import React from 'react'
import Link from 'next/link'

export function NotFound() {
  return (
    <div className="min-h-screen bg-[#F5F0EB] flex flex-col items-center justify-center px-6 relative overflow-hidden select-none">
      
      {/* Background Ambient Blur Gradient Balls */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -bottom-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-[#0E4FB3]/[0.12] to-[#0797CE]/[0.02] blur-[130px]" />
        <div className="absolute -top-[10%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-[#E8A840]/[0.12] to-[#EDE8E2]/[0.02] blur-[130px]" />
      </div>

      <div className="max-w-2xl w-full text-center relative z-10 space-y-8">
        
        {/* Dynamic 404 Text */}
        <div className="font-display font-black text-[9rem] sm:text-[12rem] md:text-[15rem] leading-none tracking-tighter flex items-center justify-center select-none">
          <span className="text-[#0E4FB3]">4</span>
          <span className="text-[#E8A840] mx-2">0</span>
          <span className="text-[#0E4FB3]">4</span>
        </div>

        {/* Heading and Description */}
        <div className="space-y-4 max-w-xl mx-auto">
          <h1 className="m-0 font-display text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#111111]">
            Oops! Page Not Found
          </h1>
          <p className="m-0 font-sans text-sm sm:text-base text-neutral-500 leading-relaxed">
            Oops! It seems like you&apos;ve ventured into uncharted territory. The page you&apos;re looking for might have been moved, deleted, or never existed. Don&apos;t worry; let&apos;s get you back on track.
          </p>
        </div>

        {/* Custom Zestate-Style Dual Button Action */}
        <div className="flex justify-center pt-4">
          <Link href="/" className="inline-flex items-center gap-1 group no-underline">
            <div className="h-12 px-8 flex items-center justify-center bg-[#E8A840] hover:bg-[#d89730] text-black font-sans text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 shadow-xs">
              Back to home
            </div>
            <div className="w-12 h-12 flex items-center justify-center bg-[#E8A840] hover:bg-[#d89730] text-black rounded-full transition-all duration-300 shadow-xs">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20" fill="none" className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                <path d="M1 1H19M19 1V19M19 1L1 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
              </svg>
            </div>
          </Link>
        </div>

      </div>
    </div>
  )
}

export default NotFound
