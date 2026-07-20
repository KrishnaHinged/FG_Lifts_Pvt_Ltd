'use client'

import Image from 'next/image'

export default function GalleryHero({ projectCount = 0 }) {
  return (
    <section className="relative h-[80vh] w-full bg-[#111111] overflow-hidden flex items-end select-none">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/elevator-steel.jpg"
          alt="FG Lifts Premium Installations"
          fill
          priority
          className="object-cover object-center opacity-40 scale-102"
          sizes="100vw"
        />
        {/* Overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(17, 17, 17, 0.2) 0%, rgba(17, 17, 17, 0.75) 70%, #F5F0EB 100%)'
          }}
        />
      </div>

      {/* Content Block */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 lg:px-24 pb-12 flex justify-between items-end">
        {/* Left Side */}
        <div className="text-left">
          <span className="block font-mono text-[11px] tracking-[0.2em] text-[#9A9A9A] uppercase mb-6">
            Portfolio
          </span>
          <h1 className="m-0 font-display text-5xl sm:text-6xl lg:text-8xl text-[#F5F0EB] leading-[1.05] tracking-tight">
            Landmark <br />
            <span className="italic">Installations</span>
          </h1>
        </div>

        {/* Right Side (only visible lg+) */}
        {projectCount > 0 && (
          <div className="hidden lg:block text-right">
            <span className="font-mono text-7xl text-[#F5F0EB]/20 font-bold select-none leading-none">
              {projectCount}
            </span>
          </div>
        )}
      </div>
    </section>
  )
}
