'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion'
import Section from '@/components/layouts/Section'
import Container from '@/components/layouts/Container'
import Heading from '@/components/typography/Heading'
import Paragraph from '@/components/typography/Paragraph'

const milestones = [
  {
    year: '1993',
    title: 'Firozgar Elevator Established',
    desc: 'Inception of Firozgar Elevator, laying the foundation of precision engineering.',
    highlight: true,
    image: '/images/fg-building.jpg'
  },
  {
    year: '1995',
    title: 'Geared Machine with Reed System',
    desc: 'Introduced advanced geared machines integrated with reed magnetic sensing.',
    image: '/images/intro/2.jpeg'
  },
  {
    year: '1998',
    title: 'Relay Panel Technology',
    desc: 'Transitioned to automated relay control panels for enhanced reliability.',
    image: '/images/intro/3.jpeg'
  },
  {
    year: '2001',
    title: 'First Auto Door Elevator',
    desc: 'Successfully engineered and installed our first fully automatic door system.',
    image: '/images/intro/4.jpeg'
  },
  {
    year: '2003',
    title: 'Drive Controller Integration',
    desc: 'Adopted variable frequency drive controllers for smooth acceleration.',
    image: '/images/intro/5.jpeg'
  },
  {
    year: '2005',
    title: '2,000+ Installations Landmark',
    desc: 'Crossed the 2,000 elevator milestone across commercial and residential sites.',
    highlight: true,
    image: '/images/intro/6.jpeg'
  },
  {
    year: '2007',
    title: 'First Car Elevator Installed',
    desc: 'Expanded into heavy-duty automotive and heavy load vertical mobility.',
    image: '/images/intro/7.jpeg'
  },
  {
    year: '2009',
    title: 'Emergency Rescue Device (ARD)',
    desc: 'Standardized automatic rescue devices ensuring passenger safety during power cuts.',
    image: '/images/intro/8.jpeg'
  },
  {
    year: '2010',
    title: '3,000+ Installations Landmark',
    desc: 'Surpassed 3,000 active elevator installations across Western India.',
    image: '/images/intro/9.jpeg'
  },
  {
    year: '2011',
    title: 'Own Manufacturing Unit',
    desc: 'Established our primary state-of-the-art manufacturing plant in Surat.',
    highlight: true,
    image: '/images/about-factory.png'
  },
  {
    year: '2012',
    title: 'Touch Panel LOP/COP Buttons',
    desc: 'Introduced sleek capacitive glass touch operating panels.',
    image: '/images/intro/10.jpeg'
  },
  {
    year: '2013',
    title: 'Gearless Machine Adoption',
    desc: 'Engineered high-efficiency permanent magnet gearless traction machines.',
    image: '/images/intro/11.jpeg'
  },
  {
    year: '2015',
    title: 'First 18-Stop Elevator (1.75 m/s)',
    desc: 'Deployed high-speed 1.75 m/s elevators for multi-story towers.',
    image: '/images/intro/12.jpeg'
  },
  {
    year: '2016',
    title: 'Fire-Rated Auto Doors',
    desc: 'Introduced certified fire-rated door assemblies meeting safety standards.',
    image: '/images/intro/13.jpeg'
  },
  {
    year: '2018',
    title: 'Firozger Elevator Industries',
    desc: 'Rebranded to Firozger Elevator Industries to reflect growing scale.',
    image: '/images/intro/14.jpeg'
  },
  {
    year: '2019',
    title: 'Digital Control System',
    desc: 'Pioneered micro-processor based digital elevator management systems.',
    image: '/images/intro/15.jpeg'
  },
  {
    year: '2021',
    title: '22-Floor 2-Ton Heavy Lift',
    desc: 'Installed high-capacity 2-ton elevators reaching 22 floors.',
    image: '/images/intro/16.jpeg'
  },
  {
    year: '2022',
    title: 'Vapi Branch Office',
    desc: 'Opened dedicated sales and support hub in Vapi to serve industrial corridors.',
    image: '/images/intro/17.jpeg'
  },
  {
    year: '2023',
    title: 'Firozger Elevator Pvt. Ltd.',
    desc: 'Incorporated as a Private Limited Company (Firozger Elevator Pvt. Ltd.).',
    highlight: true,
    image: '/images/elevator-gold.jpg'
  },
  {
    year: '2024',
    title: 'Indore Branch Office',
    desc: 'Expanded operations into Madhya Pradesh with a new branch in Indore.',
    image: '/images/intro/1.jpeg'
  },
  {
    year: '2026',
    title: 'Rebranded to FG Lifts Pvt. Ltd.',
    desc: 'Evolved into FG Lifts Pvt. Ltd., representing modern luxury vertical mobility.',
    highlight: true,
    image: '/images/elevator-steel.jpg'
  }
]

// High-fidelity vector Elevator Cabin based on blueprint and orange accent details
function ElevatorCabin({ activeYear, isHighlight }) {
  const accentColor = isHighlight ? 'var(--fg-blue)' : 'var(--fg-orange)'

  return (
    <svg
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <defs>
        <filter id="cabin-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#000000" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* Group applying shadow to the drawing elements */}
      <g filter="url(#cabin-shadow)">
        {/* Cable hanger hook on top */}
        <path d="M35 15 L50 2 L65 15 Z" fill="#222" stroke={accentColor} strokeWidth="2" />
        <circle cx="50" cy="8" r="3.5" fill={accentColor} />

        {/* Main Steel Cabin Body */}
        <rect x="15" y="15" width="70" height="92" rx="6" fill="#161616" stroke={accentColor} strokeWidth="2.5" />

        {/* Bottom buffers/weights */}
        <rect x="10" y="107" width="80" height="8" rx="2" fill={accentColor} />
        <rect x="25" y="115" width="50" height="3" fill="#333" />

        {/* Digital floor & year indicator screen */}
        <rect x="35" y="21" width="30" height="10" rx="1.5" fill="#0A0A0A" stroke={accentColor} strokeWidth="1" />
        <text
          x="50"
          y="29"
          fill={accentColor}
          fontSize="7"
          fontFamily="monospace"
          textAnchor="middle"
          fontWeight="900"
          letterSpacing="0.05em"
        >
          {activeYear || '1993'}
        </text>

        {/* Glass Doors (Left) */}
        <rect x="21" y="35" width="26" height="66" rx="2" fill="#0E1B2E" stroke={accentColor} strokeWidth="1.2" opacity="0.95" />
        <line x1="25" y1="40" x2="41" y2="80" stroke="#FFFFFF" strokeWidth="0.8" strokeLinecap="round" opacity="0.2" />
        <line x1="29" y1="40" x2="43" y2="70" stroke="#FFFFFF" strokeWidth="0.8" strokeLinecap="round" opacity="0.1" />
        <rect x="43" y="58" width="2" height="16" rx="1" fill={accentColor} />

        {/* Glass Doors (Right) */}
        <rect x="53" y="35" width="26" height="66" rx="2" fill="#0E1B2E" stroke={accentColor} strokeWidth="1.2" opacity="0.95" />
        <line x1="57" y1="40" x2="73" y2="80" stroke="#FFFFFF" strokeWidth="0.8" strokeLinecap="round" opacity="0.2" />
        <line x1="61" y1="40" x2="75" y2="70" stroke="#FFFFFF" strokeWidth="0.8" strokeLinecap="round" opacity="0.1" />
        <rect x="55" y="58" width="2" height="16" rx="1" fill={accentColor} />

        {/* High-tech ceiling light */}
        <line x1="18" y1="18" x2="82" y2="18" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
      </g>
    </svg>
  )
}

function MilestoneCard({ item, isActive, isEven }) {
  return (
    <div
      className={`p-6 sm:p-8 rounded-2xl sm:rounded-3xl border transition-all duration-500 shadow-sm relative overflow-hidden group ${item.highlight
        ? isActive
          ? 'bg-[#111111] text-white border-fg-blue shadow-lg shadow-fg-blue/10 scale-[1.02]'
          : 'bg-[#1C1C1C]/90 text-white/80 border-border-dark scale-100'
        : isActive
          ? 'bg-bg-white text-text-dark border-fg-orange shadow-lg shadow-fg-orange/10 scale-[1.02]'
          : 'bg-[#EDE8E2]/60 text-text-muted border-border-light scale-100'
        }`}
    >
      <div className={`flex items-center gap-3 mb-3 ${isEven ? 'lg:justify-end' : 'lg:justify-start'
        }`}>
        <span className={`font-mono font-extrabold text-2xl lg:text-3xl transition-colors duration-500 ${isActive
          ? item.highlight ? 'text-fg-blue' : 'text-[#0797CE]'
          : 'text-text-muted/50'
          }`}>
          {item.year}
        </span>

        {item.highlight && (
          <span className={`font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-md font-bold border transition-colors duration-500 ${isActive
            ? 'bg-fg-blue/20 text-fg-blue border-fg-blue/40'
            : 'bg-border-dark text-text-cream-muted border-border-dark'
            }`}>
            KEY MILESTONE
          </span>
        )}
      </div>

      <Heading
        level="3"
        className={`m-0 font-sans text-lg lg:text-xl font-bold uppercase tracking-tight leading-snug mb-2 transition-colors duration-500 ${isActive
          ? item.highlight ? 'text-white' : 'text-[#111111]'
          : item.highlight ? 'text-white/60' : 'text-text-muted'
          }`}
      >
        {item.title}
      </Heading>

      <Paragraph
        className={`m-0 font-sans text-sm sm:text-base leading-relaxed font-normal transition-colors duration-500 ${isActive
          ? item.highlight ? 'text-white/70' : 'text-text-body'
          : item.highlight ? 'text-white/40' : 'text-text-muted/60'
          }`}
      >
        {item.desc}
      </Paragraph>

      {/* Spotlight accent corner gradient */}
      <div className={`absolute top-0 right-0 w-16 h-16 pointer-events-none opacity-20 transition-opacity duration-500 ${isActive ? 'opacity-40' : 'opacity-10'
        } bg-gradient-to-bl ${item.highlight ? 'from-fg-blue to-transparent' : 'from-[#0797CE] to-transparent'
        }`} />
    </div>
  )
}

function MilestoneImage({ src, alt, isActive }) {
  return (
    <div
      className={`relative w-full aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden border transition-all duration-700 shadow-sm ${isActive
        ? 'border-neutral-400/40 shadow-md scale-[1.02] filter-none opacity-100'
        : 'border-transparent scale-100 filter grayscale opacity-30 blur-[0.5px]'
        }`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
        className="object-cover transition-transform duration-700"
      />
    </div>
  )
}

export default function MilestoneTimeline() {
  const containerRef = useRef(null)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    async function fetchTimeline() {
      try {
        const res = await fetch('/api/timeline')
        const data = await res.json()
        if (data.success && Array.isArray(data.milestones) && data.milestones.length > 0) {
          setItems(data.milestones)
        }
      } catch (err) {
        console.error('Failed to fetch timeline milestones:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchTimeline()
  }, [])

  const activeMilestones = items.length > 0 ? items : milestones

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  })

  // Add smooth spring motion to simulate real elevator weight/damping
  const ySpring = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001
  })

  // Map progress to travel the full distance of the track
  const yProgress = useTransform(ySpring, [0, 1], ['0%', '100%'])

  // Update active year and index dynamically as elevator scrolls
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const idx = Math.round(latest * (activeMilestones.length - 1))
    if (idx !== activeIndex && idx >= 0 && idx < activeMilestones.length) {
      setActiveIndex(idx)
    }
  })

  const currentMilestone = activeMilestones[activeIndex]

  return (
    <Section background="white" size="none" className="py-24 lg:py-32 relative select-none overflow-hidden bg-bg-cream">
      <Container className="max-w-[1280px] relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 lg:mb-24 max-w-5xl mx-auto"
        >
          <span className="inline-block font-mono text-[11px] tracking-[0.2em] text-[#0E4FB3] uppercase font-bold mb-4">
            OUR JOURNEY // 1993 – 2026
          </span>
          <Heading level="2" className="m-0 font-sans text-[clamp(36px,5.5vw,68px)] font-extrabold uppercase tracking-tight text-[#111111] leading-[1.05]">
            OVER THREE DECADES OF <br />
            <span className="text-[#0797CE]">MILESTONES &amp; INNOVATION</span>
          </Heading>
        </motion.div>

        {/* Vertical Timeline Structure */}
        <div ref={containerRef} className="relative flex flex-col space-y-16 lg:space-y-24">

          {/* ────────────────── ELEVATOR SHAFT TRACK ────────────────── */}
          {/* Braided steel rope */}
          <div className="absolute left-6 lg:left-1/2 top-12 bottom-12 w-[2px] -translate-x-1/2 bg-[repeating-linear-gradient(45deg,#999_0px,#999_2px,transparent_2px,transparent_4px)] opacity-40 z-10" />

          {/* Guide Rail Left */}
          <div className="absolute left-[12px] lg:left-[calc(50%-24px)] top-12 bottom-12 w-[1.5px] bg-[#E8E2DA] opacity-60 z-10" />

          {/* Guide Rail Right */}
          <div className="absolute left-[36px] lg:left-[calc(50%+24px)] top-12 bottom-12 w-[1.5px] bg-[#E8E2DA] opacity-60 z-10" />

          {/* ────────────────── SCROLLING ELEVATOR CABIN ────────────────── */}
          <motion.div
            style={{ top: yProgress, translateY: '-50%' }}
            className="absolute left-6 lg:left-1/2 -translate-x-1/2 z-20 w-[40px] h-[50px] lg:w-[76px] lg:h-[90px] bg-transparent will-change-transform"
          >
            <ElevatorCabin
              activeYear={currentMilestone?.year}
              isHighlight={currentMilestone?.highlight}
            />
          </motion.div>

          {/* ────────────────── MILESTONE ROWS ────────────────── */}
          {activeMilestones.map((item, index) => {
            const isEven = index % 2 === 0
            const isActive = index === activeIndex

            return (
              <div
                key={item.year}
                className="relative flex flex-col lg:grid lg:grid-cols-[1fr_120px_1fr] items-center gap-6 lg:gap-12 pl-16 lg:pl-0 min-h-[200px] lg:min-h-[280px]"
              >
                {/* Visual node sensor matching when elevator passes */}
                <div className="absolute left-6 lg:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                  <motion.div
                    animate={{
                      scale: isActive ? 1.4 : 1,
                      backgroundColor: isActive
                        ? (item.highlight ? 'var(--fg-blue)' : 'var(--fg-orange)')
                        : '#EDE8E2',
                      borderColor: isActive
                        ? '#FFFFFF'
                        : '#E8E2DA',
                      boxShadow: isActive
                        ? `0 0 16px ${item.highlight ? 'var(--fg-blue)' : 'var(--fg-orange)'}`
                        : '0 2px 4px rgba(0,0,0,0.05)'
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-4 h-4 rounded-full border-2 border-white shadow-xs"
                  />
                </div>

                {/* Left side card / image */}
                <div className={`w-full ${isEven ? 'order-1 lg:order-1 lg:text-right' : 'order-2 lg:order-1 lg:text-left'}`}>
                  {isEven ? (
                    <MilestoneCard item={item} isActive={isActive} isEven={isEven} />
                  ) : (
                    <MilestoneImage src={item.image} alt={item.title} isActive={isActive} />
                  )}
                </div>

                {/* Center column spacer */}
                <div className="hidden lg:block w-full h-full pointer-events-none lg:order-2" />

                {/* Right side image / card */}
                <div className={`w-full ${isEven ? 'order-2 lg:order-3 lg:text-left' : 'order-1 lg:order-3 lg:text-right'}`}>
                  {!isEven ? (
                    <MilestoneCard item={item} isActive={isActive} isEven={isEven} />
                  ) : (
                    <MilestoneImage src={item.image} alt={item.title} isActive={isActive} />
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

