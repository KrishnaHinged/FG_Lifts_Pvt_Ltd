'use client'

import { motion } from 'framer-motion'

export default function HomeCTA() {
  return (
    <section className="bg-[#06152F] py-[120px] select-none text-white relative overflow-hidden">
      
      {/* Subtle radial backglow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,79,179,0.12),transparent_60%)] pointer-events-none" />

      <div className="max-w-[1380px] mx-auto px-6 lg:px-8 relative z-10">
        <div className="w-full bg-[#111111]/30 border border-white/5 p-12 sm:p-16 lg:p-24 rounded-[3rem] text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0E4FB3]/5 to-transparent pointer-events-none" />
          
          <div className="flex flex-col items-center gap-[40px]">
            <div className="flex flex-col gap-4 items-center">
              <span className="font-mono text-[9px] tracking-widest text-[#D72638] uppercase font-bold">
                // 07 / Collaboration
              </span>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-[4rem] font-light text-white m-0 leading-tight">
                Elevate your <br />
                <span className="italic font-serif text-[#E8A840] lowercase first-letter:uppercase">blueprint.</span>
              </h2>
            </div>
            
            <p className="m-0 font-sans text-base text-white/60 max-w-xl font-light leading-relaxed">
              Let&apos;s co-engineer vertical mobility systems that seamlessly integrate with your structural aesthetics.
            </p>

            <a 
              href="/#contact"
              className="inline-flex items-center justify-center bg-[#0E4FB3] hover:bg-[#0A3D8B] text-white font-mono text-[11px] uppercase tracking-widest font-bold px-8 py-4 rounded-full transition-colors"
            >
              Contact Engineering
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
