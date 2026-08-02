'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import ProjectGrid from './ProjectGrid'
import ProjectModal from './ProjectModal'

const categories = ['All', 'Residential', 'Commercial', 'Industrial', 'Luxury', 'Hospitality']

export default function GalleryClient({ initialProjects = [] }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)

  // Filter projects client-side
  const filteredProjects = activeCategory === 'All'
    ? (initialProjects || [])
    : (initialProjects || []).filter(
        (proj) => proj.clientType?.toLowerCase() === activeCategory.toLowerCase()
      )

  return (
    <div className="min-h-screen bg-[#F5F0EB] pb-24 relative select-none">
      
      <section className="relative pt-32 pb-16 px-3 sm:px-4 lg:px-6">
        <div className="max-w-[2400px] mx-auto relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-[40vh] sm:h-[50vh] md:h-[55vh] rounded-[2rem] sm:rounded-[3rem] overflow-hidden border border-[#E8E2DA] bg-[#EDE8E2]/50 shadow-md flex items-center p-8 sm:p-12 md:p-16 lg:p-20 mb-16"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/elevator-steel.jpg"
                alt="FG Lifts Premium Installations"
                fill
                priority
                className="object-cover object-center scale-[1.01]"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* Banner Text Overlays */}
            <div className="relative z-10 text-left max-w-2xl text-white">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-white/60 uppercase mb-4"
              >
                FG Lift Pvt Ltd &middot; Portfolio
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="m-0 font-display text-4xl sm:text-5xl lg:text-7xl font-bold uppercase tracking-tight leading-[0.95]"
              >
                Landmark <br />
                <span className="italic font-normal text-[#E8A840] font-serif tracking-normal lowercase first-letter:uppercase">Installations</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="m-0 mt-4 text-sm sm:text-base text-white/70 max-w-md font-normal leading-relaxed"
              >
                Explore our portfolio of completed elevator installations across residential towers, commercial skyscrapers, and luxury residences.
              </motion.p>
            </div>

            {/* Grid overlay detail */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
          </motion.div>

          <div className="max-w-[1200px] mx-auto">
            
            {/* Editorial filter bar */}
        <div className="flex flex-wrap items-center justify-center mb-10 gap-y-2">
          {categories.map((cat, idx) => {
            const isCatActive = activeCategory === cat
            return (
              <div key={cat} className="flex items-center">
                <button
                  onClick={() => setActiveCategory(cat)}
                  className={`font-mono text-[11px] tracking-[0.1em] uppercase cursor-pointer bg-transparent border-none outline-none transition-colors duration-200 ${
                    isCatActive ? 'text-[#111111] font-semibold' : 'text-[#9A9A9A] hover:text-[#111111]'
                  }`}
                >
                  {cat}
                </button>
                {idx < categories.length - 1 && (
                  <span className="mx-3.5 text-[#E8E2DA] text-[11px] leading-none select-none">&middot;</span>
                )}
              </div>
            )
          })}
        </div>

        {/* Full-width Thin Rule below */}
        <div className="w-full h-px bg-[#E8E2DA] mb-12" />

        {/* Project Grid */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              {filteredProjects.length > 0 ? (
                <ProjectGrid 
                  projects={filteredProjects} 
                  onCardClick={setSelectedProject} 
                />
              ) : (
                <p className="font-mono text-[11px] text-[#9A9A9A] tracking-wider uppercase text-center py-24 m-0">
                  No projects in this category yet.
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Section 4 — Project Count Strip */}
        <div className="w-full h-px bg-[#E8E2DA] mt-24 mb-10" />
        <div className="text-center font-mono text-[11px] text-[#6B6B6B] tracking-[0.2em] uppercase">
          Showing all {filteredProjects.length} custom installations across India
        </div>

      </div>
      </div>
    </section>

    {/* Project Detail Modal Overlay */}
    {selectedProject && (
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    )}
  </div>
  )
}
