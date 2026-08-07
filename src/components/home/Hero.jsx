'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Container from '@/components/layouts/Container'
import HeroTitle from '@/components/typography/HeroTitle'
import Paragraph from '@/components/typography/Paragraph'

const ZestateButton = ({ href, text }) => (
  <a href={href} className="inline-flex items-center group select-none">
    {/* Left Arrow Box */}
    <div className="w-12 h-12 flex items-center justify-center bg-[#0797CE] text-white rounded-l-full border-r border-white/10 transition-colors duration-300 group-hover:bg-[#073f91]">
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 20 20" fill="none" className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 text-white">
        <path d="M1 1H19M19 1V19M19 1L1 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
      </svg>
    </div>
    {/* Middle Text Pill */}
    <div className="h-12 px-6 sm:px-8 flex items-center justify-center bg-[#0797CE] text-white font-mono text-[11px] font-bold uppercase tracking-widest transition-colors duration-300 group-hover:bg-[#073f91]">
      {text}
    </div>
    {/* Right Arrow Box */}
    <div className="w-12 h-12 flex items-center justify-center bg-[#0797CE] text-white rounded-r-full border-l border-white/10 transition-colors duration-300 group-hover:bg-[#073f91]">
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 20 20" fill="none" className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 text-white">
        <path d="M1 1H19M19 1V19M19 1L1 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
      </svg>
    </div>
  </a>
)

const ZestateButtonGhost = ({ href, text }) => (
  <a href={href} className="inline-flex items-center group select-none">
    <div className="w-12 h-12 flex items-center justify-center bg-transparent border border-white/20 text-white rounded-l-full border-r-0 transition-colors duration-300 group-hover:border-white/60">
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 20 20" fill="none" className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 text-white">
        <path d="M1 1H19M19 1V19M19 1L1 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
      </svg>
    </div>
    <div className="h-12 px-6 sm:px-8 flex items-center justify-center bg-transparent border-t border-b border-white/20 text-white font-mono text-[11px] font-bold uppercase tracking-widest transition-colors duration-300 group-hover:border-white/60">
      {text}
    </div>
    <div className="w-12 h-12 flex items-center justify-center bg-transparent border border-white/20 text-white rounded-r-full border-l-0 transition-colors duration-300 group-hover:border-white/60">
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 20 20" fill="none" className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 text-white">
        <path d="M1 1H19M19 1V19M19 1L1 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
      </svg>
    </div>
  </a>
)

export default function Hero() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const scale = useTransform(scrollYProgress, [0, 0.25], [1, 0.94])
  const borderRadius = useTransform(scrollYProgress, [0, 0.25], [0, 48])

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[120vh] bg-[#F5F0EB] select-none"
    >
      <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ scale, borderRadius }}
          className="relative w-full h-full bg-[#111111] overflow-hidden flex flex-col justify-end origin-center"
        >
          {/* Background image */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <motion.div
              initial={{ scale: 1.15, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full"
            >
              <Image
                src="/images/hero-bg.jpeg"
                alt="Minimal luxury architectural interior"
                fill
                priority
                className="object-cover object-center brightness-[0.7]"
                sizes="100vw"
              />
            </motion.div>
          </div>

          {/* Content Container */}
          <Container className="relative z-10 w-full max-w-[1380px] mx-auto flex flex-col justify-end h-full pb-8 sm:pb-16 lg:pb-[80px]">
            <div className="grid grid-cols-12 gap-6 items-end">
              <div className="col-span-12 lg:col-span-8 flex flex-col items-start gap-6 sm:gap-[40px]">
                <div className="flex flex-col gap-4">
                  <HeroTitle color="cream" className="uppercase leading-[1.05] text-3xl xs:text-4xl sm:text-6xl lg:text-[5.5rem] font-extrabold m-0">
                    <span className="block overflow-hidden relative">
                      <motion.span
                        initial={{ y: '100%', opacity: 0 }}
                        animate={{ y: '0%', opacity: 1 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                        className="block"
                      >
                        Engineered <span className="text-[#0797CE]">for</span> <span className="text-[#0797CE]">every</span>
                      </motion.span>
                    </span>
                    <span className="block overflow-hidden relative">
                      <motion.span
                        initial={{ y: '100%', opacity: 0 }}
                        animate={{ y: '0%', opacity: 1 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
                        className="block text-white/90"
                      >
                        vertical space.
                      </motion.span>
                    </span>
                  </HeroTitle>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="flex flex-wrap items-center gap-[24px]"
                >
                  <ZestateButton href="/products" text="Explore Systems" />
                  <ZestateButtonGhost href="/gallery" text="View Gallery" />
                </motion.div>
              </div>

              <div className="col-span-12 lg:col-span-4 flex lg:justify-end">
                <Paragraph
                  color="cream"
                  className="m-0 font-light leading-relaxed max-w-[280px] opacity-60 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Precision vertical systems designed for luxury estates, corporate headquarters, and high-density infrastructure across India.
                </Paragraph>
              </div>
            </div>
          </Container>
        </motion.div>
      </div>
    </section>
  )
}
