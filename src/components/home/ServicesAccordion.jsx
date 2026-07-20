'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const services = [
  {
    id: 'passenger',
    title: 'Passenger Lifts',
    desc: 'Premium high-speed vertical systems engineered for modern high-rises and commercial towers.',
    image: '/images/elevator-steel.jpg'
  },
  {
    id: 'capsule',
    title: 'Capsule Lifts',
    desc: 'Bespoke panoramic glass capsules designed to offer scenic transitions and architectural value.',
    image: '/images/elevator-gold.jpg'
  },
  {
    id: 'home',
    title: 'Home & Villa Lifts',
    desc: 'Compact, gearless vertical mobility crafted to integrate seamlessly with private luxury residences.',
    image: '/images/elevator-wood.jpg'
  }
]

export default function ServicesAccordion() {
  const [hoveredId, setHoveredId] = useState('passenger')

  return (
    <section className="bg-white py-[120px] select-none border-b border-[#E8E2DA]">
      <div className="max-w-[1380px] mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="grid grid-cols-12 gap-6 mb-[80px]">
          <div className="col-span-12 md:col-span-8 flex flex-col gap-4">
            <span className="font-mono text-[9px] tracking-widest text-[#D72638] uppercase font-bold">
              // 03 / Engineering Solutions
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-light text-[#111111] leading-[1.1] m-0">
              Simplify transits with <br />
              <span className="italic font-serif text-[#0E4FB3] lowercase first-letter:uppercase">custom elevator systems.</span>
            </h2>
          </div>
        </div>

        {/* Grow-on-Hover Accordion Grid */}
        <div className="flex flex-col lg:flex-row w-full gap-6 items-stretch lg:h-[450px]">
          {services.map((ser) => {
            const isHovered = hoveredId === ser.id
            return (
              <div
                key={ser.id}
                onMouseEnter={() => setHoveredId(ser.id)}
                className={`relative rounded-[2rem] border transition-all duration-500 overflow-hidden flex flex-col justify-between p-8 md:p-10 cursor-pointer ${
                  isHovered 
                    ? 'flex-[2.5] bg-[#F5F0EB]/60 border-[#0E4FB3] shadow-md' 
                    : 'flex-1 bg-white border-[#E8E2DA] hover:border-neutral-400'
                }`}
              >
                {/* Background image preview inside card on hover */}
                {isHovered && (
                  <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
                    <Image
                      src={ser.image}
                      alt={ser.title}
                      fill
                      className="object-cover object-center grayscale"
                      sizes="33vw"
                    />
                  </div>
                )}

                <div className="relative z-10 flex flex-col justify-between h-full w-full">
                  
                  {/* Card Title */}
                  <div className="flex justify-between items-center w-full">
                    <h3 className={`font-display font-light m-0 transition-all duration-300 leading-none ${
                      isHovered ? 'text-2xl md:text-3xl text-[#0E4FB3]' : 'text-xl text-[#111111]/60'
                    }`}>
                      {ser.title}
                    </h3>
                    
                    {/* Zestate Arrow Indicator Icon */}
                    <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      isHovered 
                        ? 'bg-[#0E4FB3] border-[#0E4FB3] text-white rotate-45' 
                        : 'border-[#E8E2DA] text-[#111111]/40'
                    }`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 20 20" fill="none">
                        <path d="M1 1H19M19 1V19M19 1L1 19" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
                      </svg>
                    </div>
                  </div>

                  {/* Card Details (Visible when hovered/active) */}
                  <div className={`transition-all duration-500 overflow-hidden ${
                    isHovered ? 'opacity-100 max-h-[200px] mt-6' : 'opacity-0 max-h-0'
                  }`}>
                    <p className="m-0 font-sans text-sm md:text-base text-[#6B6B6B] leading-relaxed max-w-md">
                      {ser.desc}
                    </p>
                    
                    <a 
                      href="/products"
                      className="inline-flex items-center group select-none mt-8"
                    >
                      <div className="w-10 h-10 flex items-center justify-center bg-[#0E4FB3] text-white rounded-l-full border-r border-white/10 transition-colors duration-300 group-hover:bg-[#0A3D8B]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 20 20" fill="none" className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 text-white">
                          <path d="M1 1H19M19 1V19M19 1L1 19" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
                        </svg>
                      </div>
                      <div className="h-10 px-6 flex items-center justify-center bg-[#0E4FB3] text-white font-mono text-[9px] font-bold uppercase tracking-widest transition-colors duration-300 group-hover:bg-[#0A3D8B]">
                        View Details
                      </div>
                      <div className="w-10 h-10 flex items-center justify-center bg-[#0E4FB3] text-white rounded-r-full border-l border-white/10 transition-colors duration-300 group-hover:bg-[#0A3D8B]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 20 20" fill="none" className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 text-white">
                          <path d="M1 1H19M19 1V19M19 1L1 19" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
                        </svg>
                      </div>
                    </a>
                  </div>

                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
