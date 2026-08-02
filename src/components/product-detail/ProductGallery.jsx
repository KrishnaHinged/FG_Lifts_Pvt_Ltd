'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { Rotate3d, Camera, Box } from 'lucide-react'

// Dynamic import avoids SSR for Three.js
const Lift360Viewer = dynamic(() => import('./Lift360Viewer'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-[#111] flex items-center justify-center">
      <div className="w-16 h-16 rounded-full bg-[#0E4FB3]/10 border border-[#0E4FB3]/30 flex items-center justify-center animate-pulse">
        <Rotate3d className="w-8 h-8 text-[#0E4FB3]" />
      </div>
    </div>
  )
})

export default function ProductGallery({
  images = [],
  has360View,
  panoramaUrl,
  colorVariants = [],
  finishVariants = [],
  defaultColor = '',
  defaultFinish = '',
  viewMode: propViewMode,
  setViewMode: propSetViewMode,
  activeVariant: propActiveVariant,
  setActiveVariant: propSetActiveVariant,
  activeFinish: propActiveFinish,
  setActiveFinish: propSetActiveFinish
}) {
  const [localViewMode, localSetViewMode] = useState('gallery')
  const [activeIndex, setActiveIndex] = useState(0)

  const viewMode = propViewMode !== undefined ? propViewMode : localViewMode
  const setViewMode = propSetViewMode || localSetViewMode

  const galleryImages = images.length > 0 ? images : [{ url: '/images/projects-collage.png', alt: 'FG Lifts Product' }]
  const activeFinishes = finishVariants.filter(f => f.isActive)

  const [localActiveVariant, localSetActiveVariant] = useState(() => {
    const idx = colorVariants.findIndex(v => v.label === defaultColor)
    return idx !== -1 ? idx : 0
  })

  const [localActiveFinish, localSetActiveFinish] = useState(() => {
    const idx = activeFinishes.findIndex(f => f.name === defaultFinish)
    return idx !== -1 ? idx : 0
  })

  const activeVariant = propActiveVariant !== undefined ? propActiveVariant : localActiveVariant
  const setActiveVariant = propSetActiveVariant || localSetActiveVariant
  const activeFinish = propActiveFinish !== undefined ? propActiveFinish : localActiveFinish
  const setActiveFinish = propSetActiveFinish || localSetActiveFinish

  return (
    <div className="w-full flex flex-col gap-4">
      
      {/* View Mode Toggle Strip */}
      {has360View && (
        <div className="w-full flex items-center justify-between bg-gradient-to-r from-[#0E4FB3] to-[#0b3d8f] text-white rounded-2xl px-5 py-3.5 shadow-[0_4px_16px_-4px_rgba(14,79,179,0.3)]">
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase font-bold flex items-center gap-2.5">
            <Rotate3d className="w-4 h-4 animate-spin-slow" />
            360° Cabin Configurator
          </span>

          {/* Pill Switch */}
          <div className="relative flex bg-white/[0.12] rounded-xl p-1">
            {/* Animated background pill */}
            <motion.div
              layout
              className="absolute top-1 bottom-1 rounded-lg bg-white shadow-sm"
              style={{
                width: 'calc(50% - 2px)',
                left: viewMode === 'gallery' ? '4px' : 'calc(50% + 2px)',
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
            <button
              onClick={() => setViewMode('gallery')}
              className={`relative z-10 font-mono text-[9px] uppercase tracking-wider px-4 py-1.5 rounded-lg font-bold cursor-pointer border-none outline-none select-none transition-colors duration-200 bg-transparent ${
                viewMode === 'gallery' ? 'text-[#0E4FB3]' : 'text-white/70 hover:text-white'
              }`}
            >
              <Camera className="w-3 h-3 inline-block mr-1.5 -mt-0.5" />
              Gallery
            </button>
            <button
              onClick={() => setViewMode('360')}
              className={`relative z-10 font-mono text-[9px] uppercase tracking-wider px-4 py-1.5 rounded-lg font-bold cursor-pointer border-none outline-none select-none transition-colors duration-200 bg-transparent ${
                viewMode === '360' ? 'text-[#0E4FB3]' : 'text-white/70 hover:text-white'
              }`}
            >
              <Box className="w-3 h-3 inline-block mr-1.5 -mt-0.5" />
              3D View
            </button>
          </div>
        </div>
      )}

      {/* Main View Area */}
      <div className={`relative w-full aspect-[4/3] bg-[#EDE8E2] overflow-hidden shadow-[0_8px_30px_-10px_rgba(17,17,17,0.08)] border border-[#E8E2DA]/80 ${
        has360View ? 'rounded-2xl' : 'rounded-[1.75rem]'
      }`}>
        <AnimatePresence mode="wait">
          {viewMode === '360' ? (
            <motion.div
              key="360-panel"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              <Lift360Viewer
                panoramaUrl={panoramaUrl || '/images/projects-collage.png'}
                colorVariants={colorVariants}
                finishVariants={finishVariants}
                activeVariant={activeVariant}
                setActiveVariant={setActiveVariant}
                activeFinish={activeFinish}
                setActiveFinish={setActiveFinish}
              />
            </motion.div>
          ) : (
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              <Image
                src={galleryImages[activeIndex]?.url}
                alt={galleryImages[activeIndex]?.alt || 'Product Photo'}
                fill
                priority={activeIndex === 0}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Image counter badge */}
        {viewMode === 'gallery' && galleryImages.length > 1 && (
          <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md border border-white/10 text-white font-mono text-[9px] tracking-wider uppercase px-3 py-1.5 rounded-full z-10">
            {activeIndex + 1} / {galleryImages.length}
          </div>
        )}
      </div>

      {/* Thumbnail Bar */}
      {viewMode === 'gallery' && galleryImages.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto py-1 px-0.5">
          {galleryImages.map((img, index) => {
            const isActive = activeIndex === index
            return (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`relative w-[72px] h-[72px] rounded-xl overflow-hidden cursor-pointer select-none bg-neutral-100 transition-all duration-300 outline-none p-0 flex-shrink-0 ${
                  isActive
                    ? 'ring-2 ring-[#0E4FB3] ring-offset-2 ring-offset-[#F5F0EB] shadow-[0_4px_12px_-4px_rgba(14,79,179,0.25)] scale-[0.97]'
                    : 'border-2 border-[#E8E2DA]/60 opacity-60 hover:opacity-100 hover:border-[#E8E2DA]'
                }`}
              >
                <Image
                  src={img.url}
                  alt={img.alt || `Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="72px"
                />
              </button>
            )
          })}
        </div>
      )}

      {/* Spin slow animation helper */}
      <style jsx global>{`
        @keyframes spinSlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spinSlow 8s linear infinite;
        }
      `}</style>
    </div>
  )
}
