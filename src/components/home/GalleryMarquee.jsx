'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Section from '@/components/layouts/Section'
import Container from '@/components/layouts/Container'
import Grid from '@/components/layouts/Grid'

const row1Images = [
  '/images/elevator-gold.jpg',
  '/images/elevator-steel.jpg',
  '/images/elevator-wood.jpg',
  '/images/project-1.jpg',
  '/images/project-2.jpg',
]

const row2Images = [
  '/images/project-3.jpg',
  '/images/elevator-wood.jpg',
  '/images/elevator-gold.jpg',
  '/images/project-1.jpg',
  '/images/elevator-steel.jpg',
]

export default function GalleryMarquee() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  // Top row translates left
  const x1 = useTransform(scrollYProgress, [0, 1], [-100, 100])
  // Bottom row translates right
  const x2 = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <Section
      ref={containerRef}
      background="dark"
      size="none"
      className="py-[120px] select-none text-white overflow-hidden relative border-b border-white/5"
    >
      {/* Ambient Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(14,79,179,0.06),transparent_60%)] pointer-events-none" />

      <Container className="max-w-[1380px] relative z-10 mb-16">
        {/* Header */}
        <Grid cols="12" className="gap-6 items-end">
          <div className="col-span-12 md:col-span-8 flex flex-col gap-4">
            <h2 className="font-sans text-4xl sm:text-5xl lg:text-[4rem] font-bold tracking-tight uppercase leading-[1.05] text-white m-0">
              Explore our <br />
              outstanding <span className="text-[#0797CE]">gallery</span>
            </h2>
          </div>

          <div className="col-span-12 md:col-span-4 flex md:justify-end">
            <a
              href="/gallery"
              className="inline-flex items-center group select-none"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-transparent text-white rounded-l-full border border-white/20 border-r-0 transition-colors duration-300 group-hover:bg-white group-hover:text-black group-hover:border-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 20 20" fill="none" className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 text-white group-hover:text-black">
                  <path d="M1 1H19M19 1V19M19 1L1 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
                </svg>
              </div>
              <div className="h-12 px-8 flex items-center justify-center bg-transparent text-white font-mono text-[11px] font-bold uppercase tracking-widest border-t border-b border-white/20 transition-colors duration-300 group-hover:bg-white group-hover:text-black group-hover:border-white">
                Explore Gallery
              </div>
              <div className="w-12 h-12 flex items-center justify-center bg-transparent text-white rounded-r-full border border-white/20 border-l-0 transition-colors duration-300 group-hover:bg-white group-hover:text-black group-hover:border-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 20 20" fill="none" className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 text-white group-hover:text-black">
                  <path d="M1 1H19M19 1V19M19 1L1 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
                </svg>
              </div>
            </a>
          </div>
        </Grid>
      </Container>

      {/* Sliding Marquee Rows */}
      <div className="flex flex-col gap-8 w-[150vw] ml-[-25vw]">
        {/* Row 1: Slides Left */}
        <motion.div style={{ x: x1 }} className="flex gap-8">
          {row1Images.map((src, i) => (
            <div
              key={`row1-${i}`}
              className="relative w-[300px] sm:w-[460px] aspect-square rounded-[2rem] overflow-hidden border border-white/5 bg-neutral-900 flex-shrink-0"
            >
              <Image
                src={src}
                alt="FG Lifts Installation Image"
                fill
                className="object-cover object-center transition-all duration-700"
                sizes="460px"
              />
            </div>
          ))}
        </motion.div>

        {/* Row 2: Slides Right */}
        <motion.div style={{ x: x2 }} className="flex gap-8">
          {row2Images.map((src, i) => (
            <div
              key={`row2-${i}`}
              className="relative w-[300px] sm:w-[460px] aspect-square rounded-[2rem] overflow-hidden border border-white/5 bg-neutral-900 flex-shrink-0"
            >
              <Image
                src={src}
                alt="FG Lifts Installation Image"
                fill
                className="object-cover object-center transition-all duration-700"
                sizes="460px"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}
