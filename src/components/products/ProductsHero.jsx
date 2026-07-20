'use client'

import Image from 'next/image'

export default function ProductsHero() {
  return (
    <section className="relative h-[70vh] w-full bg-[#111111] overflow-hidden flex items-center justify-center select-none">
      {/* Background Image with blur and dark overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Premium Elevator Lobby"
          fill
          priority
          className="object-cover object-center blur-xs opacity-40 scale-102"
          sizes="100vw"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#111111]/60" />
      </div>

      {/* Centered Text Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <span className="block font-mono text-[11px] tracking-[0.2em] text-[#9A9A9A] uppercase mb-6">
          Our Systems
        </span>
        <h1 className="m-0 font-display text-5xl sm:text-6xl lg:text-8xl text-[#F5F0EB] leading-[1.05] tracking-tight">
          Vertical Mobility <br />
          <span className="italic">Solutions</span>
        </h1>
      </div>

      {/* Bottom gradient transition bleed over 100px */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[100px] z-15 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, #F5F0EB)'
        }}
      />
    </section>
  )
}
