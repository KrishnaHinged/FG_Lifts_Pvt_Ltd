'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const projects = [
  {
    title: 'Sapphire Heights',
    city: 'Mumbai',
    type: 'Passenger Lifts',
    image: '/images/elevator-steel.jpg',
  },
  {
    title: 'Metro Business Park',
    city: 'Ahmedabad',
    type: 'Capsule Lifts',
    image: '/images/elevator-wood.jpg',
  },
  {
    title: 'Grand Hyatt Residences',
    city: 'Pune',
    type: 'Panoramic Lifts',
    image: '/images/elevator-gold.jpg',
  }
]

export default function ProjectShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  return (
    <section id="projects" className="bg-[#06152F] py-[120px] select-none text-white overflow-hidden relative">
      
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(14,79,179,0.15),transparent_70%)] pointer-events-none" />

      <div className="max-w-[1380px] mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="grid grid-cols-12 gap-6 mb-[60px] items-end">
          <div className="col-span-12 md:col-span-8 flex flex-col gap-4">
            <span className="font-mono text-[9px] tracking-widest text-[#D72638] uppercase font-bold">
              // 05 / Portfolio
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-light text-white leading-[1.1] m-0">
              Landmark installations, <br />
              <span className="italic font-serif text-[#E8A840] lowercase first-letter:uppercase">monuments of movement.</span>
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="col-span-12 md:col-span-4 flex justify-end gap-6 items-center">
            <span className="font-mono text-xs text-white/40">
              {String(currentIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </span>
            <div className="flex gap-4">
              <button 
                onClick={handlePrev}
                className="w-12 h-12 rounded-full border border-white/10 hover:border-white/40 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Previous Project"
              >
                ←
              </button>
              <button 
                onClick={handleNext}
                className="w-12 h-12 rounded-full border border-white/10 hover:border-white/40 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Next Project"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Fullscreen Slider Card */}
        <div className="relative w-full h-[60vh] sm:h-[70vh] rounded-[2.5rem] sm:rounded-[3.5rem] overflow-hidden border border-white/10 bg-neutral-950">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={projects[currentIndex].image}
                alt={projects[currentIndex].title}
                fill
                className="object-cover object-center brightness-75 grayscale contrast-[1.05] hover:grayscale-0 transition-all duration-[1.5s]"
                sizes="100vw"
                priority
              />
              
              {/* Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Slide Meta Copy (Aligned to Bottom Left) */}
              <div className="absolute bottom-[40px] left-[40px] right-[40px] flex flex-col md:flex-row md:items-end justify-between gap-6 z-20">
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[9px] tracking-widest text-[#E8A840] uppercase font-bold">
                    {projects[currentIndex].city}
                  </span>
                  <h3 className="font-display text-3xl sm:text-4xl lg:text-[2.5rem] font-light text-white m-0 leading-none">
                    {projects[currentIndex].title}
                  </h3>
                </div>
                <p className="m-0 font-mono text-[10px] tracking-widest text-white/50 uppercase">
                  System: {projects[currentIndex].type}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
