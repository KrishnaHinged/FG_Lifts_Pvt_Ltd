'use client'

import { motion } from 'framer-motion'

const items = [
  { value: '30+', label: 'Years of Engineering' },
  { value: '2000+', label: 'Successful Projects' },
  { value: '500+', label: 'Clients Nationwide' },
  { value: 'IND', label: 'Made in India' },
]

export default function TrustStrip() {
  return (
    <section className="bg-[#F5F0EB] py-[60px] border-b border-[#E8E2DA] select-none">
      <div className="max-w-[1380px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-6 items-center">
          {items.map((item, idx) => (
            <div 
              key={item.label}
              className="col-span-6 md:col-span-3 flex flex-col lg:flex-row items-baseline lg:items-center gap-[12px] lg:justify-center"
            >
              <span className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-[#111111] leading-none">
                {item.value}
              </span>
              <span className="font-mono text-[9px] tracking-widest text-[#6B6B6B] uppercase font-bold">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
