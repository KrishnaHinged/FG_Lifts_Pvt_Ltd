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

      {!showIntro && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
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
