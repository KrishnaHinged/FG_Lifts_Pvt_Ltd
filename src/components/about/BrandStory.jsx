'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function BrandStory() {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)

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
          const image = imageRef.current
          const section = sectionRef.current
          if (!image || !section) return

          // Scroll-synchronized image zoom and offset shift
          gsap.fromTo(image,
            { scale: 1.2, y: '-10%' },
            {
              scale: 1.05,
              y: '5%',
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              }
            }
          )

          // Smooth reveal of story paragraphs
          const paragraphs = gsap.utils.toArray('.story-paragraph')
          paragraphs.forEach((p) => {
            gsap.fromTo(p,
              { opacity: 0, y: 40 },
              {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: p,
                  start: 'top 85%',
                  toggleActions: 'play none none none',
                }
              }
            )
          })
        })

        if (!isMounted && ctx) {
          ctx.revert()
        }
      } catch (err) {
        console.error('GSAP BrandStory error:', err)
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


      <section
        ref={sectionRef}
        className="relative py-24 lg:py-32 px-6 lg:px-8 max-w-[1400px] mx-auto min-h-screen"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24 items-start">

          {/* LEFT COLUMN: Sticky Building Photo Viewer */}
          <div className="lg:sticky lg:top-[120px] w-full h-[70vh] rounded-[2.5rem] overflow-hidden relative border border-[#E8E2DA] bg-[#EDE8E2]/50 shadow-md select-none">
            {/* Building Image */}
            <div
              ref={imageRef}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/images/fg-building.jpg')" }}
            />
            {/* Glassmorphism Badge */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl z-25 flex justify-between items-center text-white">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-widest text-white/60 m-0">Corporate HQ</p>
                <h4 className="text-sm font-display uppercase tracking-tight m-0 mt-0.5 font-normal">Surat, Gujarat</h4>
              </div>
              <span className="font-mono text-[10px] font-bold text-[#0E4FB3] bg-white px-3 py-1.5 rounded-lg select-none shadow-xs">EST. 1993</span>
            </div>
            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:18px_18px] pointer-events-none" />
            {/* Subtle Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* RIGHT COLUMN: Scrolling Details */}
          <div className="space-y-16 py-6 lg:py-12">

            {/* Heading */}
            <div className="story-paragraph space-y-3">
              <span className="font-mono text-[9px] tracking-[0.3em] text-[#6B6B6B] uppercase font-bold">01 // Our Legacy</span>
              <h2 className="text-4xl md:text-5xl font-display uppercase tracking-tight text-[#111111] leading-tight m-0 font-normal">
                Over Three Decades <br />
                <span className="italic text-[#0E4FB3] font-light font-serif tracking-normal lowercase first-letter:uppercase">of Engineering Excellence</span>
              </h2>
            </div>

            {/* Paragraph Block 1: Legacy & Evolution */}
            <div className="story-paragraph space-y-4">
              <span className="font-mono text-[9px] tracking-widest text-[#0E4FB3] uppercase font-bold">1993 · The Foundation</span>
              <p className="m-0 font-sans text-base sm:text-lg text-[#6B6B6B] leading-[1.8] max-w-[560px] font-light">
                Founded as <strong className="font-semibold text-[#111111]">Firozger Elevator Industries</strong> in <strong className="font-semibold text-[#111111]">1993</strong>, we established a foundation built on trust and uncompromising quality. Today, as <strong className="font-semibold text-[#111111]">FG Lifts Pvt. Ltd.</strong>, we carry forward this legacy with a stronger vision, seamlessly connecting our heritage with modern innovation.
              </p>
            </div>

            {/* Paragraph Block 2: Trust & Reliability */}
            <div className="story-paragraph space-y-4">
              <span className="font-mono text-[9px] tracking-widest text-[#0E4FB3] uppercase font-bold">Trust & Reliability</span>
              <p className="m-0 font-sans text-base sm:text-lg text-[#6B6B6B] leading-[1.8] max-w-[560px] font-light">
                For over <strong className="font-semibold text-[#111111]">30+ years</strong>, our commitment has remained simple: deliver safe, dependable, and technologically advanced mobility solutions. This customer-first approach has earned us lasting relationships, with a remarkable <strong className="font-semibold text-[#111111]">95%</strong> of our business coming through repeat clients and trusted referrals.
              </p>
            </div>

            {/* Paragraph Block 3: Scale & Precision */}
            <div className="story-paragraph space-y-4">
              <span className="font-mono text-[9px] tracking-widest text-[#0E4FB3] uppercase font-bold">Scale & Precision</span>
              <p className="m-0 font-sans text-base sm:text-lg text-[#6B6B6B] leading-[1.8] max-w-[560px] font-light">
                With over <strong className="font-semibold text-[#111111]">7,000+</strong> successful installations, we execute every project with absolute precision. From our <strong className="font-semibold text-[#111111]">Surat</strong> headquarters to our expanding presence in <strong className="font-semibold text-[#111111]">Vapi</strong> and <strong className="font-semibold text-[#111111]">Indore</strong>, we provide long-term partnerships driven by safety and world-class craftsmanship.
              </p>
            </div>

          </div>

        </div>
      </section>
    </div>
  )
}
