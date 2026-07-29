'use client'

import Image from 'next/image'

export default function HomeLiftArtWalls({ artWalls = [] }) {
  return (
    <section className="py-20 px-6 sm:px-10 lg:px-16 bg-[#EDE8E2]/40">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <span className="font-mono text-xs tracking-[0.3em] text-[#9A9A9A] uppercase mb-3 block">
            03 / Creative Design
          </span>
          <h2 className="m-0 font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#111111]">
            Art Background Walls
          </h2>
          <div className="w-16 h-[2px] bg-[#E8600A] mx-auto mt-5" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {artWalls.map((wall, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-xl overflow-hidden p-3 flex flex-col group hover:shadow-md transition-all duration-300">
              <div className="relative aspect-[3/5] w-full bg-gray-100 rounded-lg overflow-hidden mb-3">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#111111]/30 via-transparent to-transparent z-10" />
                <Image 
                  src={wall.images?.[0]?.url || '/images/elevator-gold.jpg'}
                  alt={wall.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-2 left-2 z-20 font-mono text-[9px] font-bold text-white bg-black/50 px-2 py-0.5 rounded">
                  {wall.tagline || wall.slug.toUpperCase()}
                </div>
              </div>
              <span className="font-sans text-[10px] font-bold text-gray-900 truncate leading-snug">
                {wall.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
