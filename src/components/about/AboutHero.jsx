'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function AboutHero() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full min-h-screen bg-[#F7F4ED] pt-36 pb-12 px-6 sm:px-10 lg:px-16 flex flex-col justify-between select-none overflow-hidden"
    >
      {/* 1. Breathing Empty Header Row */}
      <div />

      {/* 2. Giant Editorial Headline Statement */}
      <div className="max-w-[1380px] mx-auto w-full flex flex-col justify-center flex-1 my-12">
        <h1 className="font-sans text-[clamp(40px,7.5vw,110px)] sm:text-[clamp(68px,9vw,120px)] font-bold tracking-tight leading-[0.9] uppercase text-[#111111] m-0 max-w-[1400px]">
          
          {/* Line 1 */}
          <span className="block overflow-hidden py-1">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="block"
            >
              THREE DECADES
            </motion.span>
          </span>

          {/* Line 2 */}
          <span className="block overflow-hidden py-1">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
              className="block"
            >
              OF MOVING
            </motion.span>
          </span>

          {/* Line 3: Inline Floating Image Block */}
          <span className="block overflow-hidden py-1">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="inline-flex items-center gap-3 sm:gap-6 align-middle"
            >
              <span>PEOPLE</span>
              <motion.span 
                initial={{ width: 0, opacity: 0, scale: 0.95 }}
                animate={{ width: 220, opacity: 1, scale: 1 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
                className="inline-block max-w-[140px] sm:max-w-[220px] h-[60px] sm:h-[80px] lg:h-[90px] relative rounded-full overflow-hidden shadow-lg bg-neutral-200 border border-black/5 align-middle"
              >
                <Image
                  src="/images/elevator-gold.jpg"
                  alt="Luxury Elevator Cabin Interior"
                  fill
                  className="object-cover object-center"
                  sizes="220px"
                  priority
                />
              </motion.span>
            </motion.span>
          </span>

          {/* Line 4 */}
          <span className="block overflow-hidden py-1">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              className="block"
            >
              BEAUTIFULLY.
            </motion.span>
          </span>
        </h1>

        {/* 3. Small Two-Line Introduction Paragraph */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="m-0 mt-12 text-sm sm:text-base text-neutral-500 max-w-xl font-light leading-relaxed"
        >
          For more than thirty years, FG Lift has engineered premium vertical mobility systems that blend precision, safety, and architectural elegance.
        </motion.p>
      </div>

      {/* 4. Minimal Scroll Indicator */}
      <div className="max-w-[1380px] mx-auto w-full flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex items-center gap-4"
        >
          <span className="font-mono text-[9px] tracking-[0.25em] text-neutral-400 uppercase">
            Scroll
          </span>
          <div className="w-16 h-[1px] bg-neutral-300" />
        </motion.div>
      </div>

    </motion.section>
  )
}
