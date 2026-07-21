'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function ProductCard({ product }) {
  if (!product) return null

  const cardRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const prevMousePos = useRef({ x: 0, y: 0 })

  // Extract specs to display on the card
  const capacitySpec = product.specifications?.find(s => s.key === 'Capacity')?.value || 'Custom Spec'
  const speedSpec = product.specifications?.find(s => s.key === 'Speed')?.value || 'Varies'

  // Color variants
  const colors = product.colorVariants?.slice(0, 4) || []

  // Motion values for smooth cursor-following position
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Motion value for arrow rotation (points in cursor movement direction)
  const arrowRotate = useMotionValue(0)

  // Spring configs
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 }
  const rotateSpring = { damping: 20, stiffness: 150, mass: 0.3 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)
  const rotate = useSpring(arrowRotate, rotateSpring)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const curX = e.clientX - rect.left
    const curY = e.clientY - rect.top

    // Set position (offset by half button size — 28px)
    mouseX.set(curX - 28)
    mouseY.set(curY - 28)

    // Calculate movement direction angle
    const dx = curX - prevMousePos.current.x
    const dy = curY - prevMousePos.current.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    // Only update rotation if mouse moved enough (avoids jitter)
    if (distance > 3) {
      const angle = Math.atan2(dy, dx) * (180 / Math.PI)
      // Arrow SVG points top-right by default (-45°), offset so 0° = right
      arrowRotate.set(angle + 45)
    }

    prevMousePos.current = { x: curX, y: curY }
  }

  const handleMouseEnter = (e) => {
    setIsHovered(true)
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect()
      const curX = e.clientX - rect.left
      const curY = e.clientY - rect.top

      mouseX.set(curX - 28)
      mouseY.set(curY - 28)
      x.jump(curX - 28)
      y.jump(curY - 28)

      arrowRotate.set(0)
      rotate.jump(0)

      prevMousePos.current = { x: curX, y: curY }
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block w-full select-none text-left no-underline outline-none cursor-none"
    >
      {/* Card container - image dominant with hover reveal */}
      <div
        ref={cardRef}
        className="relative w-full aspect-[3/4] rounded-[1.5rem] overflow-hidden bg-neutral-200 cursor-none"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >

        {/* Background Image */}
        <Image
          src={product.images?.[0]?.url || '/images/services-collage.png'}
          alt={product.name}
          fill
          className="object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 25vw"
        />

        {/* Dark gradient overlay - appears on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />

        {/* Badge - always visible */}
        {product.badge && (
          <div className="absolute top-4 left-4 z-[3] bg-white/90 backdrop-blur-lg border border-white/30 text-[#0E4FB3] font-mono text-[8px] font-extrabold uppercase tracking-[0.18em] px-3 py-1.5 rounded-full shadow-sm">
            {product.badge}
          </div>
        )}

        {/* Floating arrow button - follows cursor with directional rotation */}
        <motion.div
          className="absolute top-0 left-0 z-20 pointer-events-none"
          style={{ x, y }}
        >
          <motion.div
            initial={false}
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.4,
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg shadow-black/10"
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 20 20"
              fill="none"
              style={{ rotate }}
            >
              <path d="M1 1H19M19 1V19M19 1L1 19" stroke="#0797CE" strokeWidth="2.5" strokeLinecap="square" />
            </motion.svg>
          </motion.div>
        </motion.div>

        {/* Text content - slides up on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-10">
          <h3 className="font-sans text-[1.65rem] sm:text-[1.85rem] font-bold tracking-tight text-white m-0 leading-tight">
            {product.name}
          </h3>

          {/* Category */}
          <p className="m-0 mt-1.5 text-[13px] text-white/60 leading-relaxed font-light">
            {product.category || 'Core'} {product.subCategory ? `· ${product.subCategory}` : ''}
          </p>

          {/* Specs row */}
          <div className="flex items-center gap-5 mt-4 pt-3 border-t border-white/10">
            <div className="flex items-center gap-1.5 text-[#0797CE]">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
              <span className="text-[12px] font-medium text-white/70">{capacitySpec.split(' (')[0]}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#0797CE]">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              <span className="text-[12px] font-medium text-white/70">{speedSpec.split(' - ')[0]}</span>
            </div>

            {/* Color swatches */}
            {colors.length > 0 && (
              <div className="flex items-center gap-1 ml-auto">
                {colors.map((c, i) => (
                  <span
                    key={i}
                    className="w-3 h-3 rounded-full border border-white/30 shadow-sm"
                    style={{ backgroundColor: c.hex || '#ccc' }}
                    title={c.name}
                  />
                ))}
                {product.colorVariants?.length > 4 && (
                  <span className="font-mono text-[9px] text-white/50 tracking-wider ml-0.5">
                    +{product.colorVariants.length - 4}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </Link>
  )
}
