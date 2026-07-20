'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function ProjectModal({ project, onClose }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  // ESC key dismissal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!project) return null

  const projectImages = project.images?.length > 0 ? project.images : [project.coverImage]

  const handleNextImage = (e) => {
    e.stopPropagation()
    setActiveImageIndex((prev) => (prev + 1) % projectImages.length)
  }

  const handlePrevImage = (e) => {
    e.stopPropagation()
    setActiveImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-12">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#111111]/80 backdrop-blur-md"
        />

        {/* Modal Window Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="relative w-full max-w-5xl bg-[#F5F0EB] rounded-none overflow-hidden z-10 flex flex-col lg:flex-row max-h-[92vh] border border-[#E8E2DA] select-none"
        >
          {/* LEFT — Image Carousel (Fills left column completely) */}
          <div className="relative w-full lg:w-[58%] h-[320px] lg:h-auto min-h-[300px] lg:min-h-[550px] bg-[#111111] flex-shrink-0">
            <Image
              src={projectImages[activeImageIndex]}
              alt={project.title}
              fill
              priority
              className="object-cover"
              sizes="(max-w-1024px) 100vw, 600px"
            />

            {/* Navigation arrows (if multiple images) */}
            {projectImages.length > 1 && (
              <div className="absolute bottom-6 right-6 z-20 flex gap-2">
                <button
                  onClick={handlePrevImage}
                  className="w-8 h-8 bg-[#F5F0EB] hover:bg-white text-[#111111] flex items-center justify-center cursor-pointer border-none outline-none transition-colors rounded-none"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="w-8 h-8 bg-[#F5F0EB] hover:bg-white text-[#111111] flex items-center justify-center cursor-pointer border-none outline-none transition-colors rounded-none"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Horizontal Line indicators (left side bottom) */}
            {projectImages.length > 1 && (
              <div className="absolute bottom-6 left-6 z-20 flex gap-2">
                {projectImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation()
                      setActiveImageIndex(index)
                    }}
                    className={`h-[1.5px] w-6 border-none cursor-pointer p-0 transition-opacity duration-300 ${
                      activeImageIndex === index ? 'bg-[#F5F0EB] opacity-100' : 'bg-[#F5F0EB]/40'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — Details */}
          <div className="relative flex-1 p-10 lg:p-14 overflow-y-auto bg-[#F5F0EB] flex flex-col justify-start text-left max-h-[50vh] lg:max-h-none">
            {/* Close Button top-right */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 font-mono text-[11px] text-[#9A9A9A] tracking-[0.1em] cursor-pointer hover:text-[#111111] border-none bg-transparent outline-none uppercase font-bold"
            >
              Close
            </button>

            {/* Category */}
            <span className="font-mono text-[10px] text-[#9A9A9A] tracking-[0.2em] uppercase mb-4 block">
              {project.clientType || 'Residential'}
            </span>

            {/* Title */}
            <h2 className="m-0 font-display text-3xl sm:text-4xl text-[#111111] leading-tight font-normal pr-10">
              {project.title}
            </h2>

            {/* Thin Rule */}
            <div className="w-8 h-px bg-[#E8E2DA] my-6 flex-shrink-0" />

            {/* Meta rows */}
            <div className="space-y-3.5 flex-shrink-0">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] text-[#9A9A9A] tracking-[0.1em] uppercase w-24 flex-shrink-0">
                  Location
                </span>
                <span className="font-sans text-sm text-[#111111] font-semibold">
                  {project.location}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] text-[#9A9A9A] tracking-[0.1em] uppercase w-24 flex-shrink-0">
                  Client Type
                </span>
                <span className="font-sans text-sm text-[#111111] font-semibold">
                  {project.clientType || 'Private Residency'}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] text-[#9A9A9A] tracking-[0.1em] uppercase w-24 flex-shrink-0">
                  Year
                </span>
                <span className="font-sans text-sm text-[#111111] font-semibold">
                  {project.year}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="font-sans text-base text-[#6B6B6B] leading-[1.8] mt-6 mb-0">
              {project.description}
            </p>

            {/* Related products used */}
            {project.relatedProductSlugs?.length > 0 && (
              <div className="mt-8 border-t border-[#E8E2DA] pt-6 flex-shrink-0">
                <span className="font-mono text-[10px] text-[#9A9A9A] uppercase tracking-widest mb-3 block font-bold">
                  Products Used
                </span>
                <div className="flex flex-col items-start gap-2">
                  {project.relatedProductSlugs.map((slug) => (
                    <Link
                      key={slug}
                      href={`/products/${slug}`}
                      className="font-sans text-sm text-[#0E4FB3] hover:underline no-underline"
                    >
                      {slug.replace(/-/g, ' ')} &rarr;
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  )
}
