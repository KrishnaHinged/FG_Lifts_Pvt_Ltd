'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Rotate3d, ArrowUpRight, Gauge, Layers } from 'lucide-react'
import Badge from '@/components/ui/Badge'

export default function ProductCard({ product }) {
  if (!product) return null

  const cardRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const prevMousePos = useRef({ x: 0, y: 0 })

  // Extract specs
  const capacitySpec = product.specifications?.find(s => s.key === 'Capacity')?.value || 'Custom Spec'
  const speedSpec = product.specifications?.find(s => s.key === 'Speed')?.value || 'Varies'

  // Color variants
  const colors = product.colorVariants?.slice(0, 4) || []

  // Motion values
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const arrowRotate = useMotionValue(0)

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

    mouseX.set(curX - 28)
    mouseY.set(curY - 28)

    const dx = curX - prevMousePos.current.x
    const dy = curY - prevMousePos.current.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance > 3) {
      const angle = Math.atan2(dy, dx) * (180 / Math.PI)
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
      className="group block w-full select-none text-left no-underline outline-none"
    >
      <motion.div
        ref={cardRef}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full aspect-[3/4] rounded-[2rem] overflow-hidden bg-neutral-900 border border-[#E8E2DA]/80 shadow-[0_10px_30px_-15px_rgba(17,17,17,0.12)] group-hover:shadow-[0_25px_50px_-12px_rgba(14,79,179,0.25)] group-hover:border-[#0E4FB3]/40 transition-all duration-500"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Background Image */}
        <Image
          src={product.images?.[0]?.url || '/images/services-collage.png'}
          alt={product.name}
          fill
          className="object-cover object-center transition-transform duration-[1000ms] ease-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 group-hover:from-black/95 group-hover:via-black/40 transition-all duration-500" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 z-[3] flex items-center justify-between gap-2">
          {product.badge ? (
            <Badge variant="new" className="bg-[#0E4FB3] text-white border-none shadow-md backdrop-blur-md">
              {product.badge}
            </Badge>
          ) : (
            <Badge variant="neutral" className="bg-white/80 backdrop-blur-md text-[#111111] border-white/40">
              {product.tabGroup || 'System'}
            </Badge>
          )}

          {product.has360View && (
            <Badge variant="primary" className="bg-white/90 backdrop-blur-md text-[#0E4FB3] border-white/50 gap-1.5 shadow-sm">
              <Rotate3d className="w-3.5 h-3.5 text-[#0E4FB3]" />
              360° View
            </Badge>
          )}
        </div>

        {/* Floating cursor arrow button */}
        <motion.div
          className="absolute top-0 left-0 z-20 pointer-events-none hidden md:block"
          style={{ x, y }}
        >
          <motion.div
            initial={false}
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.4,
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-14 h-14 rounded-full bg-[#0E4FB3] text-white border border-white/40 flex items-center justify-center shadow-xl"
          >
            <motion.div style={{ rotate }}>
              <ArrowUpRight className="w-6 h-6 stroke-[2.5]" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Content Box */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7 z-10 flex flex-col gap-3">
          <div className="space-y-1">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#E8A840] font-bold block">
              {product.category || 'Passenger'} {product.subCategory ? `· ${product.subCategory}` : ''}
            </span>
            <h3 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-white m-0 leading-tight group-hover:text-[#E8A840] transition-colors duration-300">
              {product.name}
            </h3>
          </div>

          {/* Specifications row */}
          <div className="flex items-center justify-between pt-3 border-t border-white/15 text-xs text-white/80">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 font-mono text-[11px] text-white/90">
                <Layers className="w-3.5 h-3.5 text-[#0E4FB3]" />
                {capacitySpec.split(' (')[0]}
              </span>
              <span className="inline-flex items-center gap-1 font-mono text-[11px] text-white/90">
                <Gauge className="w-3.5 h-3.5 text-[#E8A840]" />
                {speedSpec.split(' - ')[0]}
              </span>
            </div>

            {/* Color Swatches */}
            {colors.length > 0 && (
              <div className="flex items-center gap-1">
                {colors.map((c, i) => (
                  <span
                    key={i}
                    className="w-3 h-3 rounded-full border border-white/40 shadow-xs"
                    style={{ backgroundColor: c.hex || '#ccc' }}
                    title={c.name}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

      </motion.div>
    </Link>
  )
}
