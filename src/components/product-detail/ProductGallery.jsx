'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { Rotate3d } from 'lucide-react'

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

export default function ProductGallery({ images = [], has360View, panoramaUrl, colorVariants = [] }) {
  const [viewMode, setViewMode] = useState('gallery') // gallery | 360
  const [activeIndex, setActiveIndex] = useState(0)

  const galleryImages = images.length > 0 ? images : [{ url: '/images/projects-collage.png', alt: 'FG Lift Product' }]

  return (
    <div className="w-full flex flex-col gap-5">
      
      {/* 360 Available Notification Strip */}
      {has360View && (
        <div className="w-full flex items-center justify-between bg-[#0E4FB3] text-white rounded-t-[2rem] px-6 py-4 shadow-sm">
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase font-bold flex items-center gap-2">
            <Rotate3d className="w-4 h-4 animate-spin-slow" />
            360° Cabin Configurator
          </span>

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('gallery')}
              className={`font-mono text-[9px] uppercase tracking-wider px-3.5 py-1.5 rounded-lg font-bold cursor-pointer border-none outline-none select-none transition-colors duration-200 ${
                viewMode === 'gallery' ? 'bg-white text-[#0E4FB3]' : 'bg-white/15 text-white hover:bg-white/20'
              }`}
            >
              Gallery
            </button>
            <button
              onClick={() => setViewMode('360')}
              className={`font-mono text-[9px] uppercase tracking-wider px-3.5 py-1.5 rounded-lg font-bold cursor-pointer border-none outline-none select-none transition-colors duration-200 ${
                viewMode === '360' ? 'bg-white text-[#0E4FB3]' : 'bg-white/15 text-white hover:bg-white/20'
              }`}
            >
              Interactive 3D
            </button>
          </div>
        </div>
      )}

      {/* Main View Area */}
      <div className={`relative w-full aspect-[4/3] bg-[#EDE8E2] overflow-hidden shadow-xs border border-[#E8E2DA] ${
        has360View ? 'rounded-b-[2rem]' : 'rounded-[2rem]'
      }`}>
        <AnimatePresence mode="wait">
          {viewMode === '360' ? (
            <motion.div
              key="360-panel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <Lift360Viewer
                panoramaUrl={panoramaUrl || '/images/projects-collage.png'}
                colorVariants={colorVariants}
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
                sizes="(max-w-768px) 100vw, 50vw"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Thumbnail Bar */}
      {viewMode === 'gallery' && galleryImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto py-1">
          {galleryImages.map((img, index) => {
            const isActive = activeIndex === index
            return (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`relative w-20 h-20 rounded-[1rem] overflow-hidden cursor-pointer select-none bg-neutral-100 transition-all duration-300 border-2 outline-none p-0 flex-shrink-0 ${
                  isActive ? 'border-[#0E4FB3] scale-95 shadow-sm' : 'border-[#E8E2DA]/60 opacity-70 hover:opacity-100'
                }`}
              >
                <Image
                  src={img.url}
                  alt={img.alt || `Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
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
