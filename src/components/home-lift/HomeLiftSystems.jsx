'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import Image from 'next/image'

export default function HomeLiftSystems({ 
  systems = [], 
  selectedSystem, 
  setSelectedSystem, 
  activeSystemDetails 
}) {
  return (
    <section id="systems" className="pt-24 lg:pt-32 pb-16 px-6 sm:px-10 lg:px-16 scroll-mt-10">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <span className="font-mono text-xs tracking-[0.3em] text-[#9A9A9A] uppercase mb-3 block">
            01 / Core Engineering
          </span>
          <h2 className="m-0 font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#111111]">
            German Drive Systems
          </h2>
          <div className="w-16 h-[2px] bg-[#E8600A] mx-auto mt-5" />
        </div>

        {/* Drive Selector Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          {systems.map(sys => (
            <button
              key={sys.slug}
              onClick={() => setSelectedSystem(sys.slug)}
              className={`px-8 py-3 rounded-full font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 cursor-pointer ${
                selectedSystem === sys.slug
                  ? 'bg-[#111111] text-white shadow-md'
                  : 'bg-white text-gray-500 hover:text-gray-900 border border-gray-200'
              }`}
            >
              {sys.slug.toUpperCase()} Technology
            </button>
          ))}
        </div>

        {/* Active System Details */}
        <AnimatePresence mode="wait">
          {activeSystemDetails && (
            <motion.div
              key={activeSystemDetails.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-center bg-white rounded-[2rem] border border-gray-200/80 p-8 sm:p-12 shadow-sm"
            >
              {/* Visual side */}
              <div className="relative aspect-video lg:aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-tr from-gray-100 to-gray-50 flex items-center justify-center p-6 border border-gray-100">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_0%,transparent_80%)]" />
                <Image 
                  src={activeSystemDetails.images?.[0]?.url || '/images/elevator-steel.jpg'}
                  alt={activeSystemDetails.name}
                  width={500}
                  height={400}
                  className="object-contain max-h-[300px] w-auto drop-shadow-2xl"
                  priority
                />
                <div className="absolute top-4 left-4 font-mono text-[10px] bg-gray-100 border border-gray-200 text-gray-500 px-3 py-1 rounded-full uppercase tracking-wider">
                  {activeSystemDetails.subCategory}
                </div>
              </div>

              {/* Details side */}
              <div className="flex flex-col">
                <span className="font-mono text-xs font-bold text-[#E8600A] uppercase tracking-wider mb-2">
                  {activeSystemDetails.tagline}
                </span>
                <h3 className="m-0 font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#111111] mb-6">
                  {activeSystemDetails.name}
                </h3>
                <p className="font-sans text-sm text-gray-600 leading-relaxed mb-8 font-light">
                  {activeSystemDetails.description}
                </p>

                <h4 className="font-mono text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-4">
                  Key Features
                </h4>
                <ul className="list-none p-0 m-0 space-y-2.5 mb-8">
                  {activeSystemDetails.features?.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 font-sans text-xs text-gray-700 font-medium">
                      <Sparkles className="w-4 h-4 text-[#E8600A] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-gray-100 pt-6">
                  <h4 className="font-mono text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-4">
                    Technical Specs
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {activeSystemDetails.specifications?.slice(0, 4).map((spec, idx) => (
                      <div key={idx} className="flex flex-col bg-gray-50 border border-gray-100 p-3.5 rounded-xl">
                        <span className="font-mono text-[8px] uppercase tracking-wider text-gray-400">{spec.key}</span>
                        <span className="font-sans text-xs font-bold text-[#111111] mt-1">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
