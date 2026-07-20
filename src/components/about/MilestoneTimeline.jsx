'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const milestones = [
  { year: '2010', title: 'Company Founded', desc: 'Started in Surat, Gujarat with custom machinery fabrication.' },
  { year: '2013', title: 'First 100 Lifts', desc: 'Reached a key milestone in home and passenger installations.' },
  { year: '2017', title: 'ISO 9001 Achieved', desc: 'Certified manufacturing standard compliance reached.' },
  { year: '2020', title: 'Pan-India Operations', desc: 'Expanded delivery networks across major metro corridors.' },
  { year: '2023', title: 'Luxury Cabins Division', desc: 'Launched bespoke cabin enclosures with premium hand-finishing.' },
  { year: '2026', title: '500+ Projects', desc: 'Solidifying our place as a leader in premium vertical mobility.' }
]

export default function MilestoneTimeline() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const progressLineRef = useRef(null)

  useEffect(() => {
    let ctx
    let isMounted = true

    async function initGSAP() {
      if (typeof window === 'undefined') return
      try {
        const gsapModule = await import('gsap')
        const scrollTriggerModule = await import('gsap/ScrollTrigger')

        if (!isMounted) return

        const gsap = gsapModule.default || gsapModule
        const ScrollTrigger = scrollTriggerModule.ScrollTrigger || scrollTriggerModule.default

        gsap.registerPlugin(ScrollTrigger)

        ctx = gsap.context(() => {
          const track = trackRef.current
          const section = sectionRef.current
          if (!track || !section) return

          // Calculate scroll width for pinning
          const totalScroll = track.scrollWidth - window.innerWidth + 120 // padding buffer

          gsap.to(track, {
            x: () => -totalScroll,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: () => `+=${totalScroll}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (progressLineRef.current) {
                  progressLineRef.current.style.width = `${self.progress * 100}%`
                }
              }
            }
          })
        })

        if (!isMounted && ctx) {
          ctx.revert()
        }
      } catch (err) {
        console.error('GSAP horizontal timeline error:', err)
      }
    }

    initGSAP()

    return () => {
      isMounted = false
      if (ctx) {
        ctx.revert()
      }
    }
  }, [])

  return (
    <div className="select-none bg-[#F5F0EB] relative">


      {/* 1. Header (Regular Flow, Cream bg) */}
      <div className="pt-32 pb-16 px-6 lg:px-24 max-w-[1200px] mx-auto relative z-10">
        <span className="block font-mono text-[9px] tracking-[0.2em] text-[#6B6B6B] uppercase mb-4 font-bold">
          Our Journey
        </span>
        <h2 className="m-0 font-display text-4xl sm:text-5xl lg:text-7xl font-bold uppercase tracking-tight text-[#111111] leading-[1.05]">
          Two Decades <br />
          <span className="italic text-[#0E4FB3] font-light font-serif tracking-normal lowercase first-letter:uppercase">of Elevation</span>
        </h2>
      </div>

      {/* 2. Desktop pinned view */}
      <section 
        ref={sectionRef}
        className="hidden lg:block h-screen w-full relative overflow-hidden"
      >
        <div 
          ref={trackRef}
          className="absolute left-0 top-0 bottom-0 flex items-center px-[10vw] whitespace-nowrap w-max"
        >
          {/* Timeline Track (Fixed container width spanning nodes) */}
          <div className="relative flex items-center h-[400px] w-[1800px]">
            {/* Base Gray Horizontal Line */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-[#E8E2DA]" />

            {/* Blue animated line overlay */}
            <div 
              ref={progressLineRef}
              className="absolute left-0 top-1/2 -translate-y-1/2 h-[1.5px] bg-[#0E4FB3] origin-left transition-all duration-75"
              style={{ width: '0%' }}
            />

            {/* Nodes Container */}
            <div className="absolute inset-0 flex justify-between items-center w-full">
              {milestones.map((node, i) => {
                const isAbove = i % 2 !== 0
                return (
                  <div 
                    key={node.year}
                    className="relative flex flex-col items-center justify-center h-full w-[280px]"
                  >
                    {/* Ring dot on line */}
                    <div className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#0E4FB3] ring-4 ring-[#0E4FB3]/10 z-10" />

                    {/* Milestone Details Card */}
                    <div 
                      className={`absolute flex flex-col text-left ${
                        isAbove ? 'bottom-[220px]' : 'top-[220px]'
                      }`}
                    >
                      <span className="font-mono text-sm text-[#0E4FB3] font-bold block mb-2">
                        {node.year}
                      </span>
                      <h4 className="m-0 font-display text-xl text-[#111111] font-semibold leading-tight">
                        {node.title}
                      </h4>
                      <p className="font-sans text-sm text-[#6B6B6B] mt-3.5 max-w-[200px] leading-relaxed whitespace-normal font-light">
                        {node.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mobile View (Vertical scroll, no pin) */}
      <section className="lg:hidden py-16 px-6 relative z-10">
        <div className="relative pl-6 border-l border-[#E8E2DA] space-y-12 ml-2 sm:ml-6">
          {milestones.map((node) => (
            <div key={node.year} className="relative">
              {/* Dot */}
              <div className="absolute left-[-29.5px] top-1.5 w-3 h-3 rounded-full bg-[#0E4FB3] ring-4 ring-[#0E4FB3]/10" />
              
              <div className="flex flex-col items-start text-left">
                <span className="font-mono text-[#0E4FB3] text-xs font-bold block mb-1">
                  {node.year}
                </span>
                <h4 className="m-0 font-display text-lg text-[#111111] font-semibold leading-tight">
                  {node.title}
                </h4>
                <p className="font-sans text-sm text-[#6B6B6B] mt-2 leading-relaxed font-light">
                  {node.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
