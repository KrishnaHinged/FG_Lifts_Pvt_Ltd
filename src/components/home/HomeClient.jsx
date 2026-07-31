'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import IntroAnimation from '@/components/intro/IntroAnimation'
import Hero from '@/components/home/Hero'
import BenefitsText from '@/components/home/BenefitsText'
import StatsGrid from '@/components/home/StatsGrid'
import ServicesGrid from '@/components/home/ServicesGrid'
import Industries from '@/components/home/Industries'
import WhyFG from '@/components/home/WhyFG'

const DynamicConfiguratorHome = dynamic(() => import('@/components/home/ConfiguratorHome'), { ssr: true, loading: () => null })
const DynamicGalleryMarquee = dynamic(() => import('@/components/home/GalleryMarquee'), { ssr: true, loading: () => null })
const DynamicTestimonials = dynamic(() => import('@/components/home/Testimonials'), { ssr: true, loading: () => null })
const DynamicContactSection = dynamic(() => import('@/components/home/ContactSection'), { ssr: true, loading: () => null })

export default function HomeClient() {
  const [showIntro, setShowIntro] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined' && sessionStorage.getItem('fg_intro_played') === 'true') {
      setShowIntro(false)
    }
  }, [])

  const handleIntroComplete = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('fg_intro_played', 'true')
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

      <div className="w-full">
        <Hero />
        <BenefitsText />
        <StatsGrid />
        <ServicesGrid />
        <Industries />
        <WhyFG />
        <DynamicConfiguratorHome />
        <DynamicGalleryMarquee />
        <DynamicTestimonials />
        <DynamicContactSection />
      </div>
    </>
  )
}
