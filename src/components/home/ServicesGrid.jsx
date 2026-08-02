'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Section from '@/components/layouts/Section'
import Container from '@/components/layouts/Container'
import Heading from '@/components/typography/Heading'
import Paragraph from '@/components/typography/Paragraph'

const services = [
  {
    id: 'passenger',
    title: 'Passenger Lifts',
    desc: 'Premium high-speed vertical systems engineered for modern high-rises, commercial hubs, and luxury apartments.',
    image: '/images/elevator-steel.jpg'
  },
  {
    id: 'capsule',
    title: 'Capsule Lifts',
    desc: 'Bespoke panoramic glass capsules designed to offer scenic vertical transits and architectural value to landmarks.',
    image: '/images/elevator-gold.jpg'
  },
  {
    id: 'home',
    title: 'Home & Villa Lifts',
    desc: 'Compact, gearless vertical mobility solutions crafted to integrate seamlessly with private luxury residences.',
    image: '/images/elevator-wood.jpg'
  }
]

export default function ServicesGrid() {
  const [hoveredId, setHoveredId] = useState('passenger')

  return (
    <Section background="white" size="none" className="py-[120px] select-none border-b border-[#E8E2DA]">
      <Container className="max-w-[1380px]">
        {/* Header */}
        <div className="grid grid-cols-12 gap-6 mb-[80px]">
          <div className="col-span-12 md:col-span-10 flex flex-col gap-4">
            <h2 className="font-sans text-4xl sm:text-5xl lg:text-[4rem] font-bold tracking-tight uppercase leading-[1.05] text-[#111111] m-0">
              We shape <span className="text-[#0797CE]">vertical mobility</span> with engineered <span className="text-[#0797CE]">lifts.</span>
            </h2>
          </div>
        </div>

        {/* Grow-on-Hover Accordion Grid */}
        <div className="flex flex-col lg:flex-row w-full gap-6 items-stretch lg:h-[500px]">
          {services.map((item) => {
            const isActive = hoveredId === item.id
            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredId(item.id)}
                className={`relative rounded-[2.5rem] overflow-hidden flex flex-col justify-between p-10 cursor-pointer transition-all duration-700 ease-[0.16,1,0.3,1] ${
                  isActive ? 'flex-[2.2] bg-neutral-900 shadow-lg' : 'flex-[1] bg-neutral-800'
                }`}
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-center transition-transform duration-1000 grayscale-[20%]"
                    style={{ transform: isActive ? 'scale(1.08)' : 'scale(1)' }}
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div
                    className="absolute inset-0 bg-black transition-all duration-700 z-10"
                    style={{ opacity: isActive ? 0.65 : 0.45 }}
                  />
                </div>

                {/* Inner Content */}
                <div className="relative z-20 flex flex-col justify-between h-full w-full">
                  {/* TOP SLOT (Title when active) */}
                  <div className="h-12 flex items-start justify-between">
                    {isActive && (
                      <motion.h3
                        layoutId={`title-${item.id}`}
                        className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-[#0797CE] uppercase m-0"
                      >
                        {item.title}
                      </motion.h3>
                    )}
                  </div>

                  {/* BOTTOM SLOT (Title when inactive, Description + CTA when active) */}
                  <div className="flex flex-col items-start gap-4">
                    {!isActive ? (
                      <motion.h3
                        layoutId={`title-${item.id}`}
                        className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-white uppercase m-0"
                      >
                        {item.title}
                      </motion.h3>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-col items-start gap-6"
                      >
                        <p className="m-0 font-sans text-sm sm:text-base text-white/80 leading-relaxed max-w-md">
                          {item.desc}
                        </p>

                        {/* Custom visual Split-Arrow Button */}
                        <Link
                          href="/products"
                          className="inline-flex items-center group/btn select-none"
                        >
                          <div className="w-10 h-10 flex items-center justify-center bg-[#0797CE] text-white rounded-l-full border-r border-white/10 transition-colors duration-300 group-hover/btn:bg-[#0A3D8B]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 20 20" fill="none" className="transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300 text-white">
                              <path d="M1 1H19M19 1V19M19 1L1 19" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
                            </svg>
                          </div>
                          <div className="h-10 px-5 flex items-center justify-center bg-[#0797CE] text-white font-mono text-[9px] font-bold uppercase tracking-widest transition-colors duration-300 group-hover/btn:bg-[#0A3D8B]">
                            Explore Lifts
                          </div>
                          <div className="w-10 h-10 flex items-center justify-center bg-[#0797CE] text-white rounded-r-full border-l border-white/10 transition-colors duration-300 group-hover/btn:bg-[#0A3D8B]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 20 20" fill="none" className="transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300 text-white">
                              <path d="M1 1H19M19 1V19M19 1L1 19" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
                            </svg>
                          </div>
                        </Link>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
