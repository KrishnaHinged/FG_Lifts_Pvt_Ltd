'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function HomeLiftCabins({
  filteredCabins = [],
  activeCabinTab,
  handleCabinTabChange,
  selectedCabinSlug,
  setSelectedCabinSlug,
  activeCabinDetails
}) {
  return (
    <section id="cabins" className="py-20 bg-white border-y border-gray-200/60 px-6 sm:px-10 lg:px-16 scroll-mt-10">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <span className="font-mono text-xs tracking-[0.3em] text-[#9A9A9A] uppercase mb-3 block">
            02 / Aesthetic Styling
          </span>
          <h2 className="m-0 font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#111111]">
            Custom Luxury Cabins
          </h2>
          <div className="w-16 h-[2px] bg-[#E8600A] mx-auto mt-5" />
        </div>

        {/* Cabin Tab Filter */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {['Standard', 'More Options', 'Panoramic'].map(tab => (
            <button
              key={tab}
              onClick={() => handleCabinTabChange(tab)}
              className={`px-6 py-2.5 rounded-full font-mono text-[10px] uppercase tracking-wider font-bold transition-all duration-300 cursor-pointer ${
                activeCabinTab === tab
                  ? 'bg-[#E8600A] text-white shadow-sm'
                  : 'bg-gray-100 text-gray-500 hover:text-gray-900 border border-gray-200/50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 items-start">
          {/* Left: Interactive Grid of Lifts */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {filteredCabins.map(cabin => (
              <div
                key={cabin.slug}
                onClick={() => setSelectedCabinSlug(cabin.slug)}
                className={`border rounded-2xl p-4 bg-gray-50/50 hover:bg-white cursor-pointer transition-all duration-300 group flex flex-col items-center ${
                  selectedCabinSlug === cabin.slug
                    ? 'border-[#E8600A] bg-white ring-2 ring-orange-500/10 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="aspect-[3/4] w-full relative rounded-xl overflow-hidden mb-3 bg-gray-50 flex items-center justify-center">
                  <Image
                    src={cabin.images?.[0]?.url || '/images/elevator-steel.jpg'}
                    alt={cabin.name}
                    fill
                    className="object-contain scale-105 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <span className="font-mono text-[11px] font-bold text-gray-900 tracking-wider">
                  {cabin.name.split(' ')[0]}
                </span>
                <span className="font-sans text-[9px] text-gray-400 mt-0.5">
                  {cabin.subCategory}
                </span>
              </div>
            ))}
          </div>

          {/* Right: Selected Spotlight Details Card */}
          <AnimatePresence mode="wait">
            {activeCabinDetails && (
              <motion.div
                key={activeCabinDetails.slug}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-gray-50/50 border border-gray-200 rounded-[2rem] p-8 shadow-xs flex flex-col"
              >
                <div className="flex justify-between items-center mb-6">
                  <span className="font-mono text-xs font-bold text-[#E8600A] uppercase tracking-wider">
                    Cabin Details
                  </span>
                  <span className="font-mono text-[10px] bg-white border border-gray-200 px-3 py-1 rounded-full text-gray-500">
                    {activeCabinDetails.name.split(' ')[0]}
                  </span>
                </div>

                <h3 className="m-0 font-display text-2xl font-bold uppercase tracking-tight text-[#111111] mb-2">
                  {activeCabinDetails.name}
                </h3>
                <p className="font-sans text-xs text-gray-500 mb-6 italic leading-relaxed">
                  "{activeCabinDetails.tagline}"
                </p>

                <div className="space-y-4 mb-8">
                  {activeCabinDetails.specifications?.map((spec, idx) => (
                    <div key={idx} className="flex flex-col bg-white border border-gray-150 p-3 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                      <span className="font-mono text-[8px] uppercase tracking-widest text-gray-400">{spec.key}</span>
                      <span className="font-sans text-xs text-gray-800 font-semibold mt-1 leading-snug">{spec.value}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/#contact"
                  className="w-full inline-flex justify-center items-center h-[46px] bg-[#111111] hover:bg-[#0E4FB3] text-white rounded-full font-bold uppercase tracking-wider text-[10px] transition-colors duration-300 no-underline"
                >
                  Request Quote
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
