'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { SkipForward } from 'lucide-react'
import LogoReveal from './LogoReveal'
import TransitionScene from './TransitionScene'

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

  const [isPreloaded, setIsPreloaded] = useState(false)
  const [videoDuration, setVideoDuration] = useState(12)
  const [showSkipButton, setShowSkipButton] = useState(false)

  const companyName = settings.companyName || 'FG Lifts'

  // 1. Monitor prefers-reduced-motion
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      onComplete()
    }
  }, [onComplete])

  // 2. Video readiness & metadata initialization hook
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateDuration = () => {
      if (video.duration && !isNaN(video.duration) && video.duration > 0) {
        setVideoDuration(video.duration)
      }
      setIsPreloaded(true)
    }

    // Check if metadata is already available
    updateDuration()

    // Trigger video load
    try {
      video.load()
    } catch (e) {
      console.warn('Video load error:', e)
    }

    video.addEventListener('loadedmetadata', updateDuration)
    video.addEventListener('loadeddata', updateDuration)
    video.addEventListener('canplay', updateDuration)
    video.addEventListener('durationchange', updateDuration)

    // Guaranteed readiness timer: after 1000ms max, show intro animation on screen
    const timer = setTimeout(() => {
      updateDuration()
      setIsPreloaded(true)
    }, 1000)

    return () => {
      video.removeEventListener('loadedmetadata', updateDuration)
      video.removeEventListener('loadeddata', updateDuration)
      video.removeEventListener('canplay', updateDuration)
      video.removeEventListener('durationchange', updateDuration)
      clearTimeout(timer)
    }
  }, [])

  // 3. Initialize GSAP ScrollTrigger Master Timeline
  useEffect(() => {
    let ctx
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

          const videoPhaseEnd = 0.65 // Video scrubbing finishes at 65% scroll progress

          // Master ScrollTrigger timeline normalized to 100 units
          const masterTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: scrollAnchor,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 2.2, // Increased from 1.5 to 2.2 for buttery smooth scroll inertia
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const progress = self.progress

                // Toggle skip button visibility during interactive scroll
                setShowSkipButton(progress > 0.05 && progress < 0.96)

                // Final transition lock: pause 1 sec when doors close at 99% progress
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
                  }, 500) // 0.5 second pause
                }
              }
            }
          })

          // STEP 1 & 2: Video scrubbing driven smoothly via a GSAP virtual playhead
          const playhead = { time: 0 }
          masterTimeline.to(playhead, {
            time: videoDuration - 0.05,
            ease: 'none', // Linear progression mapped to scroll, smoothed by GSAP's scrub inertia
            duration: 65,
            onUpdate: () => {
              if (video && videoDuration) {
                const targetTime = playhead.time
                if (!isNaN(targetTime) && Math.abs(video.currentTime - targetTime) > 0.01) {
                  try {
                    video.currentTime = targetTime
                  } catch (e) { }
                }
              }
            }
          }, 0)

          // STEP 1: Instruction HUD fades out early (0% to 12%)
          masterTimeline.to('.intro-instruction', {
            opacity: 0,
            y: -20,
            duration: 12,
            ease: 'power2.out'
          }, 0)

          // STEP 1 & 2: Video plays 0% -> 65%, then pauses on final frame 65% -> 73%
          // (No overlays scheduled between 12% and 73% - clean view of video)

          // STEP 3: Logo Reveal (73% to 90% scroll progress - ONLY after video finishes and pauses)
          masterTimeline
            .set('.logo-reveal', { display: 'flex' }, 73)
            .fromTo('.logo-reveal',
              { opacity: 0 },
              { opacity: 1, duration: 7, ease: 'sine.out' },
              73
            )
            .fromTo('.logo-title',
              { opacity: 0, y: 80, scale: 0.8 },
              { opacity: 1, y: 0, scale: 1, duration: 10, ease: 'back.out(3.5)' },
              74
            )
            .fromTo('.logo-subtitle',
              { opacity: 0, y: 25 },
              { opacity: 1, y: 0, duration: 8, ease: 'back.out(2.5)' },
              78
            )
            .fromTo('.logo-glow',
              { opacity: 0, scale: 0.8 },
              { opacity: 0.8, scale: 1, duration: 8, ease: 'sine.inOut' },
              75
            )

          // STEP 4: Smooth Cinematic Fade-Out of Intro Overlay into Home Screen (90% to 99% scroll progress)
          masterTimeline.to('.cinematic-container', {
            opacity: 0,
            duration: 9,
            ease: 'power2.inOut'
          }, 90)
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
      {!isPreloaded && (
        <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-[#111111] px-4">
          <div className="relative flex flex-col items-center max-w-md w-full text-center">
            {/* Animated rings in brand blue */}
            <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-t border-r border-[#0E4FB3] animate-spin" style={{ animationDuration: '3s' }} />
              <div className="absolute inset-2 rounded-full border-b border-l border-[#0074D9] animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }} />
              <span className="text-[#0E4FB3] font-mono text-xs tracking-wider font-bold">FG</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-[0.3em] uppercase mb-1 font-display">
              FG LIFTS
            </h1>
            <p className="text-[10px] font-mono text-[#6B6B6B] tracking-[0.2em] uppercase mb-10">
              Interactive Digital Headquarters
            </p>

            <div className="w-full space-y-2">
              <div className="h-[2px] w-full bg-white/10 overflow-hidden relative rounded-full">
                <div className="h-full bg-[#0E4FB3] w-2/3 animate-pulse" />
              </div>
              <div className="text-center text-[10px] font-mono text-[#6B6B6B]">
                <span>BUFFERING CINEMATICS</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 text-[10px] font-mono text-[#6B6B6B] tracking-wider">
            SCROLL TO ENTER EXPERIENCE
          </div>
        </div>
      )}

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
          src="/videos/intro/intro.mp4"
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
        className="relative w-full h-[500vh] bg-transparent pointer-events-none z-10"
      />
    </div>
  )
}
