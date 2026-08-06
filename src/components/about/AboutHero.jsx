'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { Shield, HeartHandshake, Activity } from 'lucide-react'
import HeroTitle from '@/components/typography/HeroTitle'
import Paragraph from '@/components/typography/Paragraph'

export default function AboutHero() {
  const containerRef = useRef(null)
  const spacerRef = useRef(null)

  const [spacerCoords, setSpacerCoords] = useState({ x: 0, y: 0, w: 220, h: 80 })
  const [windowSize, setWindowSize] = useState({ w: 1200, h: 800 })

  useEffect(() => {
    const handleResize = () => {
      if (spacerRef.current) {
        const rect = spacerRef.current.getBoundingClientRect()
        const parent = spacerRef.current.closest('.sticky-container')
        if (parent) {
          const parentRect = parent.getBoundingClientRect()
          setSpacerCoords({
            x: rect.left - parentRect.left,
            y: rect.top - parentRect.top,
            w: rect.width,
            h: rect.height
          })
          setWindowSize({
            w: parentRect.width,
            h: parentRect.height
          })
        }
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    const timer = setTimeout(handleResize, 200)

    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timer)
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  const spacerCenterX = spacerCoords.x + spacerCoords.w / 2
  const spacerCenterY = spacerCoords.y + spacerCoords.h / 2
  const viewportCenterX = windowSize.w / 2
  const viewportCenterY = windowSize.h / 2

  const headlineOpacity = useTransform(scrollYProgress, [0.1, 0.3], [1, 0])
  const headlineScale = useTransform(scrollYProgress, [0.1, 0.3], [1, 0.94])

  const imageLeft = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5],
    [spacerCenterX, spacerCenterX, viewportCenterX]
  )
  const imageTop = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5],
    [spacerCenterY, spacerCenterY, viewportCenterY]
  )

  const imageWidth = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3, 0.5],
    [spacerCoords.w, 320, 600, windowSize.w]
  )
  const imageHeight = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3, 0.5],
    [spacerCoords.h, 180, 420, windowSize.h]
  )
  const imageBorderRadius = useTransform(
    scrollYProgress,
    [0, 0.3, 0.4, 0.5],
    [999, 999, 120, 0]
  )

  const innerImageScale = useTransform(
    scrollYProgress,
    [0, 0.5],
    [1.3, 1.05]
  )

  const card1Opacity = useTransform(scrollYProgress, [0.6, 0.68, 0.96, 0.99], [0, 1, 1, 0])
  const card1Y = useTransform(scrollYProgress, [0.6, 0.68], [30, 0])

  const card2Opacity = useTransform(scrollYProgress, [0.68, 0.76, 0.96, 0.99], [0, 1, 1, 0])
  const card2Y = useTransform(scrollYProgress, [0.68, 0.76], [30, 0])

  const card3Opacity = useTransform(scrollYProgress, [0.76, 0.84, 0.96, 0.99], [0, 1, 1, 0])
  const card3Y = useTransform(scrollYProgress, [0.76, 0.84], [30, 0])

  return (
    <div ref={containerRef} className="relative h-[350vh] bg-white select-none">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute -left-[10%] top-[10%] w-[500px] h-[500px] rounded-full opacity-[0.35]"
          style={{
            background: 'radial-gradient(circle, #d4e157 0%, #c5e1a5 40%, transparent 70%)',
            filter: 'blur(100px)',
            animation: 'floatBlob1 14s ease-in-out infinite',
          }}
        />
        <div
          className="absolute -right-[8%] bottom-[5%] w-[450px] h-[450px] rounded-full opacity-[0.30]"
          style={{
            background: 'radial-gradient(circle, #ce93d8 0%, #e1bee7 40%, transparent 70%)',
            filter: 'blur(100px)',
            animation: 'floatBlob2 16s ease-in-out infinite',
          }}
        />
      </div>

      <style jsx>{`
        @keyframes floatBlob1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -30px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.97); }
        }
        @keyframes floatBlob2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, 40px) scale(0.95); }
        }
      `}</style>

      <div className="sticky top-0 w-full h-screen overflow-hidden sticky-container flex items-center justify-center">
        <motion.div
          style={{
            opacity: headlineOpacity,
            scale: headlineScale,
            willChange: 'transform, opacity'
          }}
          className="w-full max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col justify-center items-center text-center relative z-10"
        >
          <HeroTitle className="text-[clamp(30px,7.5vw,110px)] sm:text-[clamp(68px,9vw,120px)] font-bold tracking-tight leading-[0.9] uppercase text-[#111111] m-0 max-w-[1400px]">
            <span className="block whitespace-nowrap">THREE DECADES OF</span>
            <span className="inline-flex items-center gap-[0.2em] align-middle whitespace-nowrap">
              <span>MOVING</span>
              <span
                ref={spacerRef}
                className="inline-block w-[2.2em] h-[0.8em] bg-transparent align-middle shrink-0"
              />
              <span>PEOPLE</span>
            </span> <br />
            <span className="block whitespace-nowrap">BEAUTIFULLY.</span>
          </HeroTitle>
        </motion.div>

        <motion.div
          style={{
            left: imageLeft,
            top: imageTop,
            x: '-50%',
            y: '-50%',
            width: imageWidth,
            height: imageHeight,
            borderRadius: imageBorderRadius,
            position: 'absolute',
          }}
          className="overflow-hidden border border-black/5 shadow-2xl z-20 bg-neutral-200"
        >
          <motion.div
            style={{
              scale: innerImageScale,
              width: '100%',
              height: '100%',
              position: 'relative',
            }}
          >
            <Image
              src="/images/fg-building.jpg"
              alt="Luxury Elevator Cabin Interior"
              fill
              priority
              unoptimized
              className="object-cover object-center"
              sizes="100vw"
            />
          </motion.div>
        </motion.div>

        <div className="absolute bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2 w-full max-w-[1240px] px-6 sm:px-10 z-30 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Card 1 */}
          <motion.div
            style={{
              opacity: card1Opacity,
              y: card1Y,
              willChange: 'opacity, transform'
            }}
            className="bg-[#1c1c1c]/90 backdrop-blur-md border border-white/10 rounded-[2rem] p-6 sm:p-8 flex flex-col items-start text-left shadow-2xl"
          >
            <div className="bg-[#0797CE] text-white p-3 rounded-2xl w-12 h-12 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="m-0 font-sans text-base sm:text-lg font-bold text-white uppercase tracking-tight mb-2">
              1993 · The Foundation
            </h3>
            <p className="m-0 font-sans text-xs sm:text-sm text-white/70 font-light leading-relaxed">
              Founded as <strong className="font-semibold text-white">Firozger Elevator Industries</strong> in <strong className="font-semibold text-white">1993</strong>, we built on trust and quality. Today, as <strong className="font-semibold text-white">FG Lifts Pvt. Ltd.</strong>, we carry forward this legacy.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            style={{
              opacity: card2Opacity,
              y: card2Y,
              willChange: 'opacity, transform'
            }}
            className="bg-[#1c1c1c]/90 backdrop-blur-md border border-white/10 rounded-[2rem] p-6 sm:p-8 flex flex-col items-start text-left shadow-2xl"
          >
            <div className="bg-[#0797CE] text-white p-3 rounded-2xl w-12 h-12 flex items-center justify-center mb-4">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="m-0 font-sans text-base sm:text-lg font-bold text-white uppercase tracking-tight mb-2">
              Trust &amp; Reliability
            </h3>
            <p className="m-0 font-sans text-xs sm:text-sm text-white/70 font-light leading-relaxed">
              For over <strong className="font-semibold text-white">30+ years</strong>, our commitment is simple: safe, advanced mobility. This customer-first focus leads to <strong className="font-semibold text-white">95%</strong> repeat clients.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            style={{
              opacity: card3Opacity,
              y: card3Y,
              willChange: 'opacity, transform'
            }}
            className="bg-[#1c1c1c]/90 backdrop-blur-md border border-white/10 rounded-[2rem] p-6 sm:p-8 flex flex-col items-start text-left shadow-2xl"
          >
            <div className="bg-[#0797CE] text-white p-3 rounded-2xl w-12 h-12 flex items-center justify-center mb-4">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="m-0 font-sans text-base sm:text-lg font-bold text-white uppercase tracking-tight mb-2">
              Scale &amp; Precision
            </h3>
            <p className="m-0 font-sans text-xs sm:text-sm text-white/70 font-light leading-relaxed">
              With over <strong className="font-semibold text-white">7,000+</strong> installations, we execute with precision. From Surat HQ to Vapi and Indore, we provide safe, world-class craftsmanship.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
