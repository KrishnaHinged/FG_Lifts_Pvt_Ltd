'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Container from '@/components/layouts/Container'

export default function ProductHero() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.4])

  return (
    <section ref={containerRef} className="relative pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden select-none">

      {/* Background Ambient Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 50, -30, 0], y: [0, -40, 35, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[12%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-[#0E4FB3]/[0.035] blur-[140px]"
        />
        <motion.div
          animate={{ x: [0, -40, 45, 0], y: [0, 50, -30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[15%] -right-[10%] w-[45vw] h-[45vw] rounded-full bg-[#E8A840]/[0.04] blur-[120px]"
        />
      </div>

      <div className="max-w-[1380px] mx-auto relative z-10">

        {/* Main Hero Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-[62vh] sm:h-[70vh] lg:h-[75vh] min-h-[500px] rounded-[2.5rem] sm:rounded-[3.5rem] overflow-hidden border border-[#E8E2DA] shadow-[0_30px_90px_-20px_rgba(17,17,17,0.12)] flex items-end"
        >
          {/* Parallax Background Image */}
          <motion.div style={{ scale: imageScale, opacity }} className="absolute inset-0 z-0">
            <Image
              src="/images/hero-bg.jpg"
              alt="FG Lifts Architecture"
              fill
              priority
              className="object-cover object-center brightness-[0.72]"
              sizes="100vw"
            />
            {/* Layered Vignette Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/30" />
          </motion.div>

          {/* Architectural Background Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-10" />

          {/* Hero Content Panel */}
          <Container className="relative z-20 w-full p-8 sm:p-12 md:p-16 lg:p-20 flex flex-col justify-end h-full">
            <div className="grid grid-cols-12 gap-6 items-end">

              {/* Left Column: Heading & Text */}
              <div className="col-span-12 lg:col-span-8 flex flex-col items-start gap-5">

                {/* Meta Tag Pill */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-xs"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-white/90 uppercase font-bold">
                    FG Lift Pvt Ltd &middot; Catalog Configurator
                  </span>
                </motion.div>

                {/* Main Headline */}
                <div className="overflow-hidden">
                  <motion.h1
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                    className="m-0 font-light text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold uppercase tracking-tight leading-[0.92] text-white"
                  >
                    Enjoy Your <br />
                    <span className="italic font-normal text-[#E8A840] font-light tracking-normal lowercase first-letter:uppercase">Dream Ascent</span>
                  </motion.h1>
                </div>

                {/* Subtitle Paragraph */}
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.45 }}
                  className="m-0 text-sm sm:text-base lg:text-lg text-white/70 max-w-xl font-normal leading-relaxed"
                >
                  Explore customized vertical elevator systems engineered with silent traction technology, German safety standards, and bespoke architectural cabin aesthetics.
                </motion.p>
              </div>

              {/* Right Column: Key Feature Badges Strip */}
              <div className="col-span-12 lg:col-span-4 flex lg:flex-col items-start lg:items-end justify-between lg:justify-end gap-3 sm:gap-4 mt-6 lg:mt-0">
                <StatPill label="Experience" value="30+ Years" />
                <StatPill label="Traction Speed" value="1.0 - 4.0 m/s" />
                <StatPill label="Engineering" value="VVVF Gearless" />
              </div>

            </div>
          </Container>

          {/* Bottom Accent Gold Border Indicator */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#E8A840] to-transparent opacity-70 z-30" />
        </motion.div>

      </div>
    </section>
  )
}

function StatPill({ label, value }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="bg-black/40 backdrop-blur-xl border border-white/15 rounded-2xl px-4 py-2.5 flex flex-col items-start lg:items-end min-w-[120px] sm:min-w-[150px]"
    >
      <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-white/50">
        {label}
      </span>
      <span className="font-sans text-xs sm:text-sm font-bold text-[#E8A840] mt-0.5">
        {value}
      </span>
    </motion.div>
  )
}
