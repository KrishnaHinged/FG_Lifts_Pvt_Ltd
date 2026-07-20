'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const sectors = [
  {
    name: 'Residential',
    desc: 'Bespoke residential mobility for luxury towers and private villa estates.',
    image: '/images/intro/6.jpeg',
    category: 'Residential'
  },
  {
    name: 'Commercial',
    desc: 'High-speed, intelligent transit networks for commercial infrastructure.',
    image: '/images/intro/12.jpeg',
    category: 'Corporate'
  },
  {
    name: 'Infrastructure',
    desc: 'High-capacity public systems built for terminals and subways.',
    image: '/images/intro/14.jpeg',
    category: 'Public Spaces'
  },
  {
    name: 'Industrial',
    desc: 'Heavy-duty freight and cargo solutions engineered for extreme loads.',
    image: '/images/intro/11.jpeg',
    category: 'Logistics'
  }
]

export default function Industries() {
  return (
    <section id="sectors" className="bg-[#F5F0EB] py-[120px] select-none relative overflow-hidden border-b border-[#E8E2DA]">

      {/* Glowing Background Balls */}
      <div className="absolute top-[10%] left-[-10%] w-[55vw] h-[55vw] rounded-full bg-[radial-gradient(circle,rgba(168,230,120,0.12)_0%,transparent_70%)] blur-[90px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-[radial-gradient(circle,rgba(14,79,179,0.08)_0%,transparent_70%)] blur-[90px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-[1380px] mx-auto px-6 lg:px-8">

        {/* Header - Replicating Zestate Bold Uppercase Heading */}
        <div className="grid grid-cols-12 gap-6 mb-[80px]">
          <div className="col-span-12 md:col-span-10 flex flex-col gap-4">
            <span className="font-mono text-[9px] tracking-widest text-[#D72638] uppercase font-bold">
              // 04 / Sectors
            </span>
            <h2 className="font-sans text-4xl sm:text-5xl lg:text-[4rem] font-bold tracking-tight uppercase leading-[1.05] text-[#111111] m-0">
              Architectural integration <br />
              across <span className="text-[#0797CE]">every sector.</span>
            </h2>
          </div>
        </div>

        {/* Grid of cards */}
        <div className="grid grid-cols-12 gap-6 md:gap-[24px]">
          {sectors.map((sector, idx) => (
            <motion.div
              key={sector.name}
              initial={{ y: 35, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: idx * 0.08 }}
              className="col-span-12 sm:col-span-6 lg:col-span-3 group flex flex-col p-6 rounded-[2.5rem] bg-white border border-[#E8E2DA] hover:border-neutral-400 hover:shadow-lg transition-all duration-500 justify-between cursor-pointer"
            >
              {/* Image first */}
              <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden mb-6 border border-[#E8E2DA] bg-neutral-100">
                <Image
                  src={sector.image}
                  alt={sector.name}
                  fill
                  className="object-cover object-center group-hover:scale-[1.06] transition-transform duration-1000 grayscale-[10%] group-hover:grayscale-0"
                  sizes="(max-w-[768px]) 100vw, 25vw"
                />
              </div>

              {/* Text second */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] tracking-wider uppercase text-fg-muted font-bold">
                    {sector.category}
                  </span>

                  {/* Zestate Style Hover Arrow */}
                  <div className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-400 group-hover:bg-[#0797CE] group-hover:border-[#0797CE] group-hover:text-white transition-all duration-300 group-hover:rotate-45">
                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 20 20" fill="none">
                      <path d="M1 1H19M19 1V19M19 1L1 19" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
                    </svg>
                  </div>
                </div>

                <h3 className="font-sans text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-[#111111] m-0 group-hover:text-[#0797CE]transition-colors duration-300">
                  {sector.name}
                </h3>
                <p className="m-0 text-sm text-[#6B6B6B] leading-relaxed font-light">
                  {sector.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
