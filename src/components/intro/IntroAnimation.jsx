'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SkipForward } from 'lucide-react'
import LogoReveal from './LogoReveal'
import TransitionScene from './TransitionScene'
import LuxuryElevatorLoader from '@/components/loading/LuxuryElevatorLoader'

function TypewriterInstruction() {
  const english = "Scroll to Enter"
  const hindi = "मुख्य स्क्रीन पर जाने के लिए स्क्रॉल करें"

  return (
    <div className="intro-instruction fixed left-6 sm:left-12 md:left-20 top-1/2 -translate-y-1/2 z-45 max-w-[calc(100vw-32px)] sm:max-w-3xl md:max-w-4xl pointer-events-none text-left select-none opacity-100">
      <div className="space-y-4 sm:space-y-5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 48 }}
          transition={{ type: "spring", stiffness: 100, damping: 12, delay: 0.1 }}
          className="h-[2px] bg-[#0E4FB3] opacity-80"
        />

        <div className="flex flex-col gap-2.5 sm:gap-3 drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
          {/* English Text */}
          <div className="relative inline-block w-max max-w-full">
            <motion.h3
              initial={{ opacity: 0, y: 40, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 90, damping: 9, mass: 0.8, delay: 0.3 }}
              className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-white m-0 leading-tight whitespace-nowrap overflow-visible"
            >
              {english}
            </motion.h3>
          </div>

          {/* Hindi Text */}
          <div className="relative inline-block w-max max-w-full">
            <motion.h3
              initial={{ opacity: 0, y: 25, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 90, damping: 10, mass: 0.8, delay: 0.8 }}
              className="font-sans text-lg sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-wide text-white/90 m-0 leading-tight whitespace-nowrap overflow-visible"
            >
              {hindi}
            </motion.h3>
          </div>
        </div>

        {/* Action description HUD */}
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: [0, -4, 0] }}
          transition={{
            opacity: { delay: 1.5, duration: 0.5 },
            y: {
              repeat: Infinity,
              duration: 2.0,
              ease: "easeInOut",
              delay: 2.0
            }
          }}
          className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-white/40 uppercase pl-1 m-0 font-semibold flex items-center gap-1.5"
        >
          <span>Interactive Scroll Guide</span>
          <motion.span 
            animate={{ y: [0, 3, 0] }} 
            transition={{ repeat: Infinity, duration: 1.0, ease: "easeInOut" }}
            className="inline-block"
          >
            ↓
          </motion.span>
        </motion.p>
      </div>
    </div>
  )
}

export default function IntroAnimation({ onComplete, settings = {} }) {
  const pinWrapperRef = useRef(null)
  const scrollAnchorRef = useRef(null)
  const videoRef = useRef(null)
  const completionTriggeredRef = useRef(false)

  const [videoReady, setVideoReady] = useState(false)
  const [loaderAnimDone, setLoaderAnimDone] = useState(false)
  const [videoDuration, setVideoDuration] = useState(12)
  const [showSkipButton, setShowSkipButton] = useState(false)
  const [videoSrc, setVideoSrc] = useState('/videos/intro/intro.mp4')

  const isPreloaded = videoReady && loaderAnimDone
  const companyName = settings.companyName || 'FG Lifts'

  // 1. Monitor prefers-reduced-motion
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      onComplete()
    }
  }, [onComplete])

  // 2. Determine video source based on screen width (mobile/tablet vs desktop)
  useEffect(() => {
    const checkScreen = () => {
      const isMobileOrTablet = window.innerWidth < 1024
      setVideoSrc(isMobileOrTablet ? '/videos/intro/intro2.mp4' : '/videos/intro/intro.mp4')
    }

    checkScreen()
    window.addEventListener('resize', checkScreen)
    return () => window.removeEventListener('resize', checkScreen)
  }, [])

  // 3. Video readiness & metadata initialization hook
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    setVideoReady(false)

    const handleReady = () => {
      if (video.duration && !isNaN(video.duration) && video.duration > 0) {
        setVideoDuration(video.duration)
      }
      setVideoReady(true)
    }

    if (video.readyState >= 2) {
      handleReady()
    }

    try {
      video.load()
    } catch (e) {
      console.warn('Video load error:', e)
    }

    video.addEventListener('loadedmetadata', handleReady)
    video.addEventListener('loadeddata', handleReady)
    video.addEventListener('canplay', handleReady)
    video.addEventListener('canplaythrough', handleReady)
    video.addEventListener('durationchange', handleReady)

    // Fallback safety timer: after 3500ms max, mark video as ready
    const timer = setTimeout(() => {
      handleReady()
    }, 3500)

    return () => {
      video.removeEventListener('loadedmetadata', handleReady)
      video.removeEventListener('loadeddata', handleReady)
      video.removeEventListener('canplay', handleReady)
      video.removeEventListener('canplaythrough', handleReady)
      video.removeEventListener('durationchange', handleReady)
      clearTimeout(timer)
    }
  }, [videoSrc])

  // 3. Initialize GSAP ScrollTrigger Master Timeline
  useEffect(() => {
    let ctx
    let animRafId = null
    let isMounted = true

    async function initGSAP() {
      if (!isPreloaded || !videoDuration) return

      try {
        const gsapModule = await import('gsap')
        const scrollTriggerModule = await import('gsap/ScrollTrigger')

        if (!isMounted) return

        const gsap = gsapModule.default || gsapModule
        const ScrollTrigger = scrollTriggerModule.ScrollTrigger || scrollTriggerModule.default

        gsap.registerPlugin(ScrollTrigger)

        ctx = gsap.context(() => {
          const pinWrapper = pinWrapperRef.current
          const scrollAnchor = scrollAnchorRef.current
          const video = videoRef.current
          if (!pinWrapper || !scrollAnchor || !video) return

          // Ensure video currentTime starts at 0 for scrubbing
          try {
            video.currentTime = 0
          } catch (e) { }

          let targetTime = 0

          // Continuous Spring-Damped Video Lerp Loop for 60 FPS Bouncy Physics
          function smoothVideoLoop() {
            if (videoRef.current && videoDuration) {
              const current = videoRef.current.currentTime
              const diff = targetTime - current

              if (Math.abs(diff) > 0.001) {
                try {
                  // Exponential spring lerp (0.18 factor) provides silky-smooth, elastic inertia
                  videoRef.current.currentTime = current + diff * 0.18
                } catch (e) { }
              }
            }
            animRafId = requestAnimationFrame(smoothVideoLoop)
          }
          animRafId = requestAnimationFrame(smoothVideoLoop)

          // Master ScrollTrigger timeline normalized to 100 units
          const masterTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: scrollAnchor,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 1.0, // 1.0s scrub matches Lenis smooth scroll inertia perfectly for bouncy feel
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const progress = self.progress

                // Toggle skip button visibility during interactive scroll
                const shouldShowSkip = progress > 0.05 && progress < 0.96
                setShowSkipButton(prev => prev !== shouldShowSkip ? shouldShowSkip : prev)

                // Final transition lock: pause brief 400ms when doors close at 99% progress
                if (progress >= 0.99 && !completionTriggeredRef.current) {
                  completionTriggeredRef.current = true

                  if (window.lenis && typeof window.lenis.stop === 'function') {
                    window.lenis.stop()
                  }

                  setTimeout(() => {
                    onComplete()
                    if (window.lenis && typeof window.lenis.start === 'function') {
                      window.lenis.start()
                    }
                  }, 400)
                }
              }
            }
          })

          // STEP 1 & 2: Video scrubbing driven via smooth spring lerp playhead
          const playhead = { time: 0 }
          masterTimeline.to(playhead, {
            time: videoDuration - 0.05,
            ease: 'none',
            duration: 65,
            onUpdate: () => {
              targetTime = playhead.time
            }
          }, 0)

          // STEP 1: Instruction HUD bounces and fades out early (0% to 15%)
          masterTimeline.to('.intro-instruction', {
            opacity: 0,
            y: -40,
            scale: 0.94,
            duration: 15,
            ease: 'back.in(1.7)'
          }, 0)

          // STEP 3: Logo Reveal with bouncy spring easing (70% to 88% scroll progress)
          masterTimeline
            .set('.logo-reveal', { display: 'flex' }, 70)
            .fromTo('.logo-reveal',
              { opacity: 0 },
              { opacity: 1, duration: 8, ease: 'power2.out' },
              70
            )
            .fromTo('.logo-title',
              { opacity: 0, y: 70, scale: 0.82 },
              { opacity: 1, y: 0, scale: 1, duration: 12, ease: 'back.out(2.4)' },
              71
            )
            .fromTo('.logo-subtitle',
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 10, ease: 'back.out(1.8)' },
              75
            )
            .fromTo('.logo-glow',
              { opacity: 0, scale: 0.7 },
              { opacity: 0.85, scale: 1.05, duration: 10, ease: 'back.out(1.5)' },
              73
            )

          // STEP 4: Cinematic Fade-Out into Home Screen (88% to 99% scroll progress)
          masterTimeline.to('.cinematic-container', {
            opacity: 0,
            duration: 11,
            ease: 'power2.inOut'
          }, 88)
        })

        if (!isMounted && ctx) {
          ctx.revert()
        }
      } catch (err) {
        console.error('GSAP intro timeline error:', err)
      }
    }

    initGSAP()

    return () => {
      isMounted = false
      if (animRafId) cancelAnimationFrame(animRafId)
      if (ctx) {
        ctx.revert()
      }
    }
  }, [isPreloaded, videoDuration, onComplete])

  const handleSkip = () => {
    completionTriggeredRef.current = true
    if (window.lenis && typeof window.lenis.start === 'function') {
      window.lenis.start()
    }
    onComplete()
  }

  return (
    <div ref={pinWrapperRef} className="w-full relative bg-white select-none z-50">

      {/* 1. Preloader Overlay */}
      <AnimatePresence>
        {!isPreloaded && (
          <LuxuryElevatorLoader
            key="intro-loader"
            theme="dark"
            mode="compact"
            onComplete={() => setLoaderAnimDone(true)}
          />
        )}
      </AnimatePresence>

      {/* 2. Floating controllers */}
      {isPreloaded && showSkipButton && (
        <div className="fixed top-6 right-6 z-[55] flex items-center">
          {/* Skip Intro button */}
          <button
            onClick={handleSkip}
            className="flex items-center space-x-2 px-4 py-2 border border-[#E8E2DA] bg-[#F5F0EB]/90 backdrop-blur-md rounded-full font-mono text-[10px] tracking-widest text-[#6B6B6B] hover:text-[#0E4FB3] hover:bg-white uppercase transition-all duration-300 cursor-pointer shadow-sm"
          >
            <span>Skip Intro</span>
            <SkipForward className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* 3. Fixed Overlay Container (Animate Video Playback Here) */}
      <div className="cinematic-container fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-40 bg-[#040C1A] transition-all duration-500">

        {/* Luxury Dark Ambient Background Layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#06152F] via-[#0A2244] to-[#020914] z-0" />

        {/* Single H.264 intra-frame compiled MP4 video */}
        <video
          ref={videoRef}
          src={videoSrc}
          playsInline
          muted
          preload="auto"
          controls={false}
          className="absolute inset-0 w-full h-full object-cover opacity-90 z-10 pointer-events-none select-none [&::-webkit-media-controls]:!hidden [&::-webkit-media-controls-start-playback-button]:!hidden"
        />

        {/* Blue Vignette Shadow Overlay (No heavy black) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(14,79,179,0.15)_100%)] z-15 pointer-events-none" />

        {/* Modular Overlays */}
        <TypewriterInstruction />
        <LogoReveal companyName={companyName} />
        <TransitionScene />
      </div>

      {/* 4. Scroll trigger anchor in document flow */}
      <div
        ref={scrollAnchorRef}
        className="relative w-full h-[300vh] bg-transparent pointer-events-none z-10"
      />
    </div>
  )
}
