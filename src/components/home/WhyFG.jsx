'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const principles = [
  {
    num: '01',
    title: 'Engineering',
    desc: 'IS/ISO certified design principles and high-speed vertical mechanics designed for longevity.'
  },
  {
    num: '02',
    title: 'Craftsmanship',
    desc: 'Hand-finished cabin details, premium materials, and custom-tailored interior panels.'
  },
  {
    num: '03',
    title: 'Customization',
    desc: 'Solving spatial shaft puzzles with bespoke cabin structures and layout specifications.'
  },
  {
    num: '04',
    title: 'Safety',
    desc: 'Rigorous load testing to 125% capacity and multi-level redundant emergency brakes.'
  },
  {
    num: '05',
    title: 'Innovation',
    desc: 'Regenerative drive systems, micro-processor controllers, and IoT remote diagnostics.'
  }
]

export default function WhyFG() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  return (
    <section className="bg-white py-[120px] select-none border-b border-[#E8E2DA] relative overflow-hidden">

      {/* Background Glowing Ball */}
      <div className="absolute top-[30%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-[radial-gradient(circle,rgba(165,124,240,0.06)_0%,transparent_70%)] blur-[90px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-[1380px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-6 lg:gap-[80px]">

          {/* Left Column - Sticky */}
          <div className="col-span-12 lg:col-span-4 lg:sticky lg:top-32 lg:self-start flex flex-col gap-4">
            {/* <span className="font-mono text-[9px] tracking-widest text-[#D72638] uppercase font-bold">
              // 05 / Principles
            </span> */}
            <h2 className="font-sans text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight uppercase leading-[1.05] text-[#111111] m-0">
              Built on <br />
              <span className="text-[#0797CE]">engineering.</span>
            </h2>
            <p className="m-0 mt-4 font-sans text-sm text-[#6B6B6B] leading-relaxed max-w-[280px] font-light">
              We do not just construct elevators—we engineer vertical movement systems designed to outlast expectations.
            </p>
          </div>

          {/* Right Column - Principles List */}
          <div className="col-span-12 lg:col-span-8 flex flex-col">
            {principles.map((pr, idx) => {
              const isHovered = hoveredIndex === idx
              return (
                <div
                  key={pr.title}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="group flex items-start gap-6 py-[40px] border-b border-[#E8E2DA] transition-colors duration-300 relative cursor-pointer first:pt-0 last:border-b-0"
                >
                  {/* Hover Red Accent Dot Indicator (Framer Motion X Slide) */}
                  <motion.div
                    initial={{ x: -15, opacity: 0 }}
                    animate={isHovered ? { x: 0, opacity: 1 } : { x: -15, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-[-20px] top-[50%] -translate-y-1/2 w-2 h-2 rounded-full bg-[#D72638] hidden lg:block"
                  />

                  {/* Num */}
                  <span className="font-mono text-[11px] text-[#6B6B6B] tracking-wider font-bold pt-1.5 w-12 group-hover:text-[#111111] transition-colors duration-300">
                    {pr.num}
                  </span>

                  {/* Content */}
                  <div className="flex-1 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                    <h3 className="font-sans text-2xl lg:text-[2.2rem] font-bold tracking-tight uppercase text-[#111111] m-0 group-hover:text-[#0797CE] transition-colors duration-300 leading-none">
                      {pr.title}
                    </h3>
                    <p className="m-0 font-sans text-sm text-[#6B6B6B] leading-relaxed max-w-[420px] group-hover:text-[#0797CE] transition-colors duration-300 font-light">
                      {pr.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
