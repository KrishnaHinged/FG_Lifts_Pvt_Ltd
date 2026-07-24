'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import IntroAnimation from '@/components/intro/IntroAnimation'
import Hero from '@/components/home/Hero'
import BenefitsText from '@/components/home/BenefitsText'
import StatsGrid from '@/components/home/StatsGrid'
import ServicesGrid from '@/components/home/ServicesGrid'
import Industries from '@/components/home/Industries'
import WhyFG from '@/components/home/WhyFG'
import GalleryMarquee from '@/components/home/GalleryMarquee'
import Testimonials from '@/components/home/Testimonials'
import ConfiguratorHome from '@/components/home/ConfiguratorHome'
import ContactSection from '@/components/home/ContactSection'

export default function HomeClient() {
  const [showIntro, setShowIntro] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleIntroComplete = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
      if (window.lenis && typeof window.lenis.scrollTo === 'function') {
        window.lenis.scrollTo(0, { immediate: true })
      }

      setTimeout(() => {
        window.scrollTo(0, 0)
        if (window.lenis && typeof window.lenis.scrollTo === 'function') {
          window.lenis.scrollTo(0, { immediate: true })
        }
      }, 50)
    }

    setIsTransitioning(true)
    setShowIntro(false)

    if (typeof window !== 'undefined') {
      sessionStorage.setItem('fg_intro_played', 'true')
    }
  }

  if (!mounted) {
    return <div className="min-h-screen bg-[#111111]" />
  }

  return (
    <>
      {showIntro && (
        <IntroAnimation
          settings={{ companyName: 'FG Lifts' }}
          onComplete={handleIntroComplete}
        />
      )}

      {isTransitioning && (
        <div className="fixed inset-0 w-full h-full z-[100] flex flex-col pointer-events-none">
          <motion.div
            initial={{ height: '50%' }}
            animate={{ height: '0%' }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={() => setIsTransitioning(false)}
            className="h-1/2 w-full bg-[#111111] border-b border-[#E8E2DA]/20 flex items-end justify-center relative"
          >
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#0E4FB3]/20" />
            <div className="absolute bottom-4 left-0 right-0 h-[2px] bg-[#E8E2DA]/10" />
          </motion.div>

          <motion.div
            initial={{ height: '50%' }}
            animate={{ height: '0%' }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="h-1/2 w-full bg-[#111111] border-t border-[#E8E2DA]/20 flex items-start justify-center relative"
          >
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#0E4FB3]/20" />
            <div className="absolute top-4 left-0 right-0 h-[2px] bg-[#E8E2DA]/10" />
          </motion.div>
        </div>
      )}

      {!showIntro && (
        <motion.div
          initial={{ y: -40, opacity: 0.9 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Hero />{/*done redesign*/}
          <BenefitsText />{/*done redesign*/}
          <StatsGrid />
          <ServicesGrid />{/*done redesign*/}
          <Industries />{/*done redesign*/}
          <WhyFG />
          <ConfiguratorHome />
          <GalleryMarquee />{/*done redesign*/}
          <Testimonials />{/*done redesign*/}
          <ContactSection />{/*done redesign*/}
        </motion.div>
      )}
    </>
  )
}
