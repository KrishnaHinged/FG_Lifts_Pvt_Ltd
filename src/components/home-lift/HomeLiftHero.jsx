'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function HomeLiftHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-[#F5F0EB] text-[#111111] overflow-hidden px-8 sm:px-16 md:px-24 lg:px-32 select-none">

      {/* Editorial Gradient Ball - Left aligned peach-orange glowing orb matching mockup exactly */}
      <div className="absolute left-[-150px] top-[20%] w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-[#E8600A]/25 to-[#F08040]/15 blur-[90px] pointer-events-none" />

      {/* Subtle secondary light reflection */}
      <div className="absolute right-[-100px] bottom-[10%] w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle,rgba(14,79,179,0.03)_0%,transparent_75%)] blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] w-full text-center">


        {/* Dynamic Massive Editorial Headline (Light Weight, Spacious Tracking & Leading) */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          className="font-sans text-[10vw] sm:text-[7.5vw] lg:text-[6vw] font-light uppercase tracking-[0.03em] text-[#111111] leading-[1.3] m-0"
        >
          {/* Row 1 */}
          <div className="block font-light">
            Meet Our New Launch
          </div>

          {/* Row 2: Standard inline capsule element */}
          <div className="block font-light">
            Home Lifts
            <span className="inline-block ml-[0.2em] font-light text-[#0E4FB3] tracking-[0.04em]">
              Series.
            </span>
          </div>
        </motion.h1>

      </div>
    </section>
  )
}
