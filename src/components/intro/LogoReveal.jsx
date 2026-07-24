'use client'

import Image from 'next/image'

export default function LogoReveal({ companyName }) {
  return (
    <div className="logo-reveal absolute inset-0 z-25 bg-[#F5F0EB] flex flex-col items-center justify-center text-center px-4 pointer-events-none opacity-0" style={{ display: 'none' }}>
      
      {/* Branded Logo Image Card */}
      <div className="logo-title w-[280px] h-[158px] relative mb-6">
        <Image
          src="/images/logo.png"
          alt="FG Lifts Logo"
          fill
          className="object-contain"
          sizes="280px"
          priority
        />
      </div>

      {/* Subtitle */}
      <p className="logo-subtitle text-[10px] font-mono tracking-[0.3em] uppercase text-[#6B6B6B] mt-4 opacity-0 font-semibold">
        Future & Growth
      </p>

      {/* Volumetric glow back-panel */}
      <div className="logo-glow absolute w-96 h-96 bg-[#0E4FB3]/5 rounded-full blur-[100px] opacity-0 pointer-events-none" />
    </div>
  )
}
