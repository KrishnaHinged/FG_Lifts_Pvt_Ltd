'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function AboutTeaser() {
  return (
    <section id="about" className="bg-[#F5F0EB] py-[120px] select-none">
      <div className="max-w-[1380px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-6 md:gap-[80px] items-center">
          
          {/* Left: Magazine-style Portrait Image */}
          <div className="col-span-12 md:col-span-6 relative aspect-[3/4] rounded-[2rem] overflow-hidden border border-[#E8E2DA] shadow-sm bg-[#EDE8E2]/50">
            <Image
              src="/images/fg-building.jpg"
              alt="FG Lifts Corporate Headquarter Building"
              fill
              className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
              sizes="(max-w-[768px]) 100vw, 50vw"
            />
          </div>

          {/* Right: Copy & Action */}
          <div className="col-span-12 md:col-span-6 flex flex-col items-start gap-[40px]">
            <motion.div 
              initial={{ opacity: 0.25, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-4"
            >
              <span className="font-mono text-[9px] tracking-widest text-[#D72638] uppercase font-bold">
                // 01 / Legacy
              </span>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-light text-[#111111] leading-[1.1] m-0">
                A heritage of <br />
                <span className="italic font-serif text-[#0E4FB3] lowercase first-letter:uppercase">engineering excellence.</span>
              </h2>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0.25, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="m-0 font-sans text-lg text-[#6B6B6B] leading-[1.8] font-light max-w-[480px]"
            >
              FG Lifts designs and manufactures premium vertical mobility systems that combine three decades of craftsmanship with modern architectural aesthetics.
            </motion.p>

            <a 
              href="/about"
              className="inline-flex items-center justify-center bg-transparent border border-[#111111]/20 hover:border-[#111111] text-[#111111] font-mono text-[11px] uppercase tracking-widest font-bold px-8 py-4 rounded-full transition-colors"
            >
              Our Story
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
