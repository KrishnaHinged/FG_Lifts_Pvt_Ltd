'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import Image from 'next/image'
import Section from '@/components/layouts/Section'
import Container from '@/components/layouts/Container'
import Grid from '@/components/layouts/Grid'

const sectors = [
  {
    name: 'Residential',
    desc: 'Bespoke residential mobility for luxury towers and private villa estates.',
    image: '/images/intro/9.jpeg',
    category: 'Residential'
  },
  {
    name: 'Commercial',
    desc: 'High-speed, intelligent transit networks for commercial infrastructure.',
    image: '/images/intro/6.jpeg',
    category: 'Corporate'
  },
  {
    name: 'Infrastructure',
    desc: 'High-capacity public systems built for terminals and subways.',
    image: '/images/intro/4.jpeg',
    category: 'Public Spaces'
  },
  {
    name: 'Industrial',
    desc: 'Heavy-duty freight and cargo solutions engineered for extreme loads.',
    image: '/images/intro/8.jpeg',
    category: 'Logistics'
  }
]

function SectorCard({ sector, idx }) {
  const cardRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const prevMousePos = useRef({ x: 0, y: 0 })

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
    <motion.div
      initial={{ y: 35, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: idx * 0.08 }}
      className="col-span-12 sm:col-span-6 lg:col-span-3 group cursor-none"
    >
      <div
        ref={cardRef}
        className="relative w-full aspect-[3/4] rounded-[1.5rem] overflow-hidden bg-neutral-200 cursor-none"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          src={sector.image}
          alt={sector.name}
          fill
          className="object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 25vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />

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

        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-10">
          <h3 className="font-sans text-[1.65rem] sm:text-[1.85rem] font-bold tracking-tight text-white m-0 leading-tight">
            {sector.name}
          </h3>
          <p className="m-0 mt-1.5 text-[13px] text-white/60 leading-relaxed font-light">
            {sector.desc}
          </p>

          <div className="flex items-center gap-5 mt-4 pt-3 border-t border-white/10">
            <div className="flex items-center gap-1.5 text-[#0797CE]">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.38 3.46L16 2L12 5.5L8 2L3.62 3.46a2 2 0 0 0-1.34 1.93l.38 12.7A2 2 0 0 0 4.62 20L12 22l7.38-2a2 2 0 0 0 1.96-1.91l.38-12.7a2 2 0 0 0-1.34-1.93z" />
              </svg>
              <span className="text-[12px] font-medium text-white/70">{sector.category}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#0797CE]">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="21" x2="9" y2="9" />
              </svg>
              <span className="text-[12px] font-medium text-white/70">Premium</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#0797CE]">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="text-[12px] font-medium text-white/70">24/7</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Industries() {
  return (
    <Section id="sectors" background="cream" size="none" className="py-[120px] select-none relative overflow-hidden border-b border-[#E8E2DA]">
      <div className="absolute top-[10%] left-[-10%] w-[55vw] h-[55vw] rounded-full bg-[radial-gradient(circle,rgba(168,230,120,0.12)_0%,transparent_70%)] blur-[90px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-[radial-gradient(circle,rgba(14,79,179,0.08)_0%,transparent_70%)] blur-[90px] pointer-events-none z-0" />

      <Container className="relative z-10 max-w-[1380px]">
        {/* Header */}
        <div className="grid grid-cols-12 gap-6 mb-[80px]">
          <div className="col-span-12 md:col-span-10 flex flex-col gap-4">
            <h2 className="font-sans text-4xl sm:text-5xl lg:text-[4rem] font-bold tracking-tight uppercase leading-[1.05] text-[#111111] m-0">
              Architectural integration <br />
              across <span className="text-[#0797CE]">every sector.</span>
            </h2>
          </div>
        </div>

        {/* Grid of cards */}
        <Grid cols="12" className="gap-6 md:gap-[24px]">
          {sectors.map((sector, idx) => (
            <SectorCard key={sector.name} sector={sector} idx={idx} />
          ))}
        </Grid>
      </Container>
    </Section>
  )
}
