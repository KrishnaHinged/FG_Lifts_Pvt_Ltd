'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function ConfiguratorHome() {
  return (
    <section className="bg-[#F5F0EB] py-[120px] select-none border-b border-[#E8E2DA] relative overflow-hidden">

      {/* Background Glowing Balls */}
      <div className="absolute top-[10%] left-[-10%] w-[55vw] h-[55vw] rounded-full bg-[radial-gradient(circle,rgba(168,230,120,0.12)_0%,transparent_70%)] blur-[90px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-[radial-gradient(circle,rgba(14,79,179,0.06)_0%,transparent_70%)] blur-[90px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-[1380px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-6 md:gap-[80px] items-center">

          {/* Left Column: Copy & Actions */}
          <div className="col-span-12 md:col-span-5 flex flex-col items-start gap-[40px]">
            <div className="flex flex-col gap-4">
              {/* <span className="font-mono text-[9px] tracking-widest text-[#D72638] uppercase font-bold">
                // 06 / Configurator
              </span> */}
              <h2 className="font-sans text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight uppercase leading-[1.05] text-[#111111] m-0">
                Craft your <br />
                <span className="text-[#0797CE]">cabin atmosphere.</span>
              </h2>
            </div>

            <p className="m-0 font-sans text-sm text-[#6B6B6B] leading-relaxed max-w-[380px] font-light">
              Experiment with luxury veneers, mirrors, custom lighting, and premium metal cladding inside our interactive 3D cabin configurator.
            </p>

            {/* Zestate Split-Arrow Button */}
            <a
              href="/products"
              className="inline-flex items-center group select-none"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-[#0797CE] text-white rounded-l-full border-r border-white/10 transition-colors duration-300 group-hover:bg-[#0A3D8B]">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 20 20" fill="none" className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 text-white">
                  <path d="M1 1H19M19 1V19M19 1L1 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
                </svg>
              </div>
              <div className="h-12 px-8 flex items-center justify-center bg-[#0797CE] text-white font-mono text-[11px] font-bold uppercase tracking-widest transition-colors duration-300 group-hover:bg-[#0A3D8B]">
                Explore in 360°
              </div>
              <div className="w-12 h-12 flex items-center justify-center bg-[#0797CE] text-white rounded-r-full border-l border-white/10 transition-colors duration-300 group-hover:bg-[#0A3D8B]">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 20 20" fill="none" className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 text-white">
                  <path d="M1 1H19M19 1V19M19 1L1 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
                </svg>
              </div>
            </a>
          </div>

          {/* Right Column: Cabin Render Display */}
          <div className="col-span-12 md:col-span-7 relative aspect-[4/3] rounded-[2.5rem] overflow-hidden border border-[#E8E2DA] shadow-lg bg-white flex items-center justify-center p-8 group">
            {/* Ambient subtle backglow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,79,179,0.04),transparent_60%)] pointer-events-none" />

            <motion.div
              animate={{
                y: [0, -12, 0]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="relative w-[70%] h-[90%] transition-transform duration-700 group-hover:scale-[1.03]"
            >
              <Image
                src="/images/360-gold.png"
                alt="Luxury 3D Cabin Configurator Gold Render"
                fill
                className="object-contain object-center"
                sizes="(max-w-[768px]) 100vw, 50vw"
              />
            </motion.div>

            {/* Stamp HUD Overlay */}
            <div className="absolute bottom-6 right-6 bg-[#06152F]/90 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/10 flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D72638] animate-pulse" />
              <span className="font-mono text-[9px] tracking-widest text-white uppercase font-bold">
                Gold Edition Cabin
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
