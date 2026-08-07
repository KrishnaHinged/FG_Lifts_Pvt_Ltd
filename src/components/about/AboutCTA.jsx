'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import Section from '@/components/layouts/Section'
import Container from '@/components/layouts/Container'
import Grid from '@/components/layouts/Grid'
import Heading from '@/components/typography/Heading'
import Paragraph from '@/components/typography/Paragraph'

export default function AboutCTA() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  const width = useTransform(scrollYProgress, [0, 1], ['100%', '88%'])
  const height = useTransform(scrollYProgress, [0, 1], ['100vh', '75vh'])
  const borderRadius = useTransform(scrollYProgress, [0, 1], [0, 56])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.98])
  const y = useTransform(scrollYProgress, [0, 1], [0, -15])
  const shadow = useTransform(
    scrollYProgress,
    [0, 1],
    ['0px 0px 0px rgba(0,0,0,0)', '0px 30px 70px rgba(0,0,0,0.45)']
  )

  return (
    <section ref={containerRef} className="relative py-12 sm:py-20 lg:py-0 lg:h-[140vh] bg-[#F5F0EB] select-none">
      {/* Mobile/Tablet View (<1024px): Non-sticky fluid section */}
      <div className="block lg:hidden px-4 sm:px-8">
        <div className="relative overflow-hidden bg-[#1c1c1c] rounded-3xl p-6 sm:p-10 z-10 shadow-2xl">
          <Container className="relative z-20 w-full max-w-[1280px] mx-auto">
            <Grid cols="12" className="gap-6 items-center">
              <div className="col-span-12 flex flex-col justify-center items-start text-left">
                <Heading level="2" className="font-sans text-[clamp(28px,4.5vw,42px)] font-extrabold text-white mb-3 uppercase tracking-tight leading-[1.08] m-0">
                  READY TO <br />
                  <span className="text-[#0797CE]">RISE HIGHER?</span>
                </Heading>

                <Paragraph className="font-sans text-sm sm:text-base text-white/70 max-w-[580px] mb-6 font-light leading-relaxed m-0">
                  Partner with FG Lifts for your next project. Experience world-class engineering, bespoke customization, and uncompromising safety.
                </Paragraph>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto mb-6">
                  <Link
                    href="/contact"
                    className="bg-[#0797CE] hover:bg-[#067fae] text-white font-mono text-[11px] font-bold uppercase tracking-widest px-6 py-3.5 rounded-full transition-all duration-300 w-full sm:w-auto text-center no-underline inline-block"
                  >
                    Contact Us Today
                  </Link>
                  <Link
                    href="/products"
                    className="bg-transparent border border-white/20 hover:border-white/40 text-white font-mono text-[11px] font-bold uppercase tracking-widest px-6 py-3.5 rounded-full transition-all duration-300 w-full sm:w-auto text-center no-underline inline-block"
                  >
                    Explore Products
                  </Link>
                </div>
              </div>

              <div className="col-span-12 w-full flex justify-center">
                <div className="relative w-full aspect-[16/9] max-h-[180px] rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-[#2a2a2a]">
                  <Image
                    src="/images/hero-bg.jpeg"
                    alt="FG Lifts Engineering & Manufacturing"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 500px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </Grid>
          </Container>
        </div>
      </div>

      {/* Desktop View (>=1024px): Pinned sticky animated card with flush right media */}
      <div className="hidden lg:flex sticky top-0 w-full h-screen overflow-hidden items-center justify-center">
        <motion.div
          style={{
            width,
            height,
            borderRadius,
            scale,
            y,
            boxShadow: shadow
          }}
          className="relative overflow-hidden bg-[#1c1c1c] flex items-center justify-between w-full h-full z-10 p-0"
        >
          <div className="flex-1 p-12 xl:p-16 flex flex-col justify-center items-start text-left z-20 max-w-[640px]">
            <Heading level="2" className="font-sans text-[clamp(36px,4.2vw,56px)] font-extrabold text-white mb-6 uppercase tracking-tight leading-[1.08] m-0">
              READY TO <br />
              <span className="text-[#0797CE]">RISE HIGHER?</span>
            </Heading>

            <Paragraph className="font-sans text-base xl:text-lg text-white/70 max-w-[540px] mb-10 font-light leading-relaxed m-0">
              Partner with FG Lifts for your next project. Experience world-class engineering, bespoke customization, and uncompromising safety.
            </Paragraph>

            {/* Buttons */}
            <div className="flex items-center gap-4 w-auto">
              <Link
                href="/contact"
                className="bg-[#0797CE] hover:bg-[#067fae] text-white font-mono text-[11px] font-bold uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg text-center no-underline inline-block"
              >
                Contact Us Today
              </Link>
              <Link
                href="/products"
                className="bg-transparent border border-white/20 hover:border-white/40 text-white font-mono text-[11px] font-bold uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg text-center no-underline inline-block"
              >
                Explore Products
              </Link>
            </div>
          </div>

          {/* Right Side Flush Media Panel */}
          <div className="relative w-[48%] h-full shrink-0 overflow-hidden bg-[#2a2a2a]">
            <Image
              src="/images/hero-bg.jpeg"
              alt="FG Lifts Engineering & Manufacturing"
              fill
              className="object-cover object-center"
              sizes="800px"
              priority
            />
            {/* Smooth gradient blend into left dark panel */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1c1c1c] via-transparent to-transparent opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}