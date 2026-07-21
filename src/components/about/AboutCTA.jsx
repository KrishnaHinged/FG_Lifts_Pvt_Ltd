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
    <section ref={containerRef} className="relative h-[140vh] bg-[#F5F0EB] select-none">
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        <motion.div
          style={{
            width,
            height,
            borderRadius,
            scale,
            y,
            boxShadow: shadow
          }}
          className="relative overflow-hidden bg-[#1c1c1c] flex items-center justify-center w-full h-full z-10 p-8 sm:p-12 lg:p-16"
        >
          <Container className="relative z-20 w-full max-w-[1280px] mx-auto">
            <Grid cols="12" className="gap-8 lg:gap-12 items-center">
              {/* Left Content Column */}
              <div className="col-span-12 lg:col-span-7 flex flex-col justify-center items-start text-left">
                <Heading level="2" className="font-sans text-[clamp(32px,4.5vw,58px)] font-extrabold text-white mb-6 uppercase tracking-tight leading-[1.08] m-0">
                  READY TO <br />
                  <span className="text-[#0797CE]">RISE HIGHER?</span>
                </Heading>

                <Paragraph className="font-sans text-base sm:text-lg text-white/70 max-w-[580px] mb-10 font-light leading-relaxed m-0">
                  Partner with FG Lifts for your next project. Experience world-class engineering, bespoke customization, and uncompromising safety.
                </Paragraph>

                {/* Buttons */}
                <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
                  <Link
                    href="/contact"
                    className="bg-[#0797CE] hover:bg-[#067fae] text-white font-mono text-[11px] font-bold uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg w-full sm:w-auto text-center no-underline inline-block"
                  >
                    Contact Us Today
                  </Link>
                  <Link
                    href="/products"
                    className="bg-transparent border border-white/20 hover:border-white/40 text-white font-mono text-[11px] font-bold uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg w-full sm:w-auto text-center no-underline inline-block"
                  >
                    Explore Products
                  </Link>
                </div>
              </div>

              {/* Right Side Capsule Image */}
              <div className="col-span-12 lg:col-span-5 w-full flex justify-center lg:justify-end">
                <div className="relative w-full aspect-[3/4] max-w-[420px] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-[#2a2a2a]">
                  <Image
                    src="/images/hero-bg.jpeg"
                    alt="FG Lifts Engineering & Manufacturing"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 500px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </Grid>
          </Container>
        </motion.div>
      </div>
    </section>
  )
}