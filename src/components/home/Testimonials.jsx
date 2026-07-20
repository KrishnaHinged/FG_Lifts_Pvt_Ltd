'use client'

import { motion } from 'framer-motion'

const col1 = [
  {
    quote: '"Whisper-quiet operations and clean architectural integration. The villa lift they installed is simply exceptional."',
    name: 'Rajesh Patel',
    title: 'Homeowner, Ahmedabad',
    bgColor: 'bg-[#1A1A1A] text-white',
    avatar: 'RP'
  },
  {
    quote: '"The customized gold-finish glass capsule lift is the design centerpiece of our luxury retail experience center."',
    name: 'Ananya Sharma',
    title: 'VP Projects, Greenfield Group',
    bgColor: 'bg-[#0E4FB3] text-white',
    avatar: 'AS'
  },
  {
    quote: '"FG Lifts has been our trusted partner for commercial high-rises. Exceptional performance under peak loads."',
    name: 'Vikram Shah',
    title: 'Director, Shah Towers',
    bgColor: 'bg-[#1A1A1A] text-white',
    avatar: 'VS'
  }
]

const col2 = [
  {
    quote: '"FG Lifts has been our trusted partner for commercial high-rises. Exceptional performance under peak loads."',
    name: 'Vikram Shah',
    title: 'Director, Shah Towers',
    bgColor: 'bg-[#1A1A1A] text-white',
    avatar: 'VS'
  },
  {
    quote: '"From structural consulting to commissioning, they solved our vertical shaft space constraints with complete ease."',
    name: 'Amit Desai',
    title: 'Principal Architect, Studio AD',
    bgColor: 'bg-[#0797CE] text-black',
    avatar: 'AD'
  },
  {
    quote: '"Whisper-quiet operations and clean architectural integration. The villa lift they installed is simply exceptional."',
    name: 'Rajesh Patel',
    title: 'Homeowner, Ahmedabad',
    bgColor: 'bg-[#1A1A1A] text-white',
    avatar: 'RP'
  }
]

const col3 = [
  {
    quote: '"The customized gold-finish glass capsule lift is the design centerpiece of our luxury retail experience center."',
    name: 'Ananya Sharma',
    title: 'VP Projects, Greenfield Group',
    bgColor: 'bg-[#0E4FB3] text-white',
    avatar: 'AS'
  },
  {
    quote: '"Whisper-quiet operations and clean architectural integration. The villa lift they installed is simply exceptional."',
    name: 'Rajesh Patel',
    title: 'Homeowner, Ahmedabad',
    bgColor: 'bg-[#1A1A1A] text-white',
    avatar: 'RP'
  },
  {
    quote: '"FG Lifts has been our trusted partner for commercial high-rises. Exceptional performance under peak loads."',
    name: 'Vikram Shah',
    title: 'Director, Shah Towers',
    bgColor: 'bg-[#1A1A1A] text-white',
    avatar: 'VS'
  }
]

function TestimonialCard({ item }) {
  const isDarkBg = item.bgColor.includes('bg-[#1A1A1A]') || item.bgColor.includes('bg-[#0E4FB3]')
  return (
    <div className={`w-full rounded-[2rem] p-8 flex flex-col justify-between h-[280px] shrink-0 border border-white/5 ${item.bgColor}`}>
      <p className={`font-sans text-sm sm:text-base leading-relaxed m-0 font-light ${isDarkBg ? 'text-white/80' : 'text-black/80'}`}>
        {item.quote}
      </p>

      <div className="flex items-center gap-3.5 mt-6">
        {/* Profile Circle */}
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold ${item.bgColor.includes('bg-[#E8A840]') ? 'bg-black/10 text-black' : 'bg-white/10 text-white'
          }`}>
          {item.avatar}
        </div>
        <div>
          <h4 className={`font-sans text-sm font-bold m-0 ${isDarkBg ? 'text-white' : 'text-black'}`}>
            {item.name}
          </h4>
          <span className={`font-mono text-[9px] tracking-wider uppercase font-semibold block ${isDarkBg ? 'text-white/40' : 'text-black/40'}`}>
            {item.title}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="bg-[#111111] py-[120px] select-none overflow-hidden relative">
      {/* Glow Effects */}
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(14,79,179,0.06),transparent_70%)] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(232,168,64,0.04)_0%,transparent_70%)] blur-[100px] pointer-events-none" />

      <div className="max-w-[1380px] mx-auto px-6 lg:px-8 relative z-10">

        {/* Header - Replicating Zestate Bold Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-16 max-w-2xl mx-auto">
          {/* <span className="font-mono text-[9px] tracking-[0.25em] text-[#D72638] uppercase font-bold">
            // 07 / Feedback
          </span> */}
          <h2 className="font-sans text-4xl sm:text-5xl lg:text-[4rem] font-bold tracking-tight uppercase leading-[1.05] text-white m-0">
            What <span className="text-[#0797CE]">our clients</span> <br />
            are saying
          </h2>
        </div>

        {/* 3-Column Infinite Vertical Marquee */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px] overflow-hidden relative mask-gradient-vertical">

          {/* Top/Bottom gradient fade mask overlays for cards column */}
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#111111] to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#111111] to-transparent z-20 pointer-events-none" />

          {/* Column 1: Slides Up */}
          <div className="flex flex-col gap-6 overflow-hidden h-full">
            <div className="flex flex-col gap-6 animate-marquee-y">
              {[...col1, ...col1, ...col1].map((item, idx) => (
                <TestimonialCard key={`col1-${idx}`} item={item} />
              ))}
            </div>
          </div>

          {/* Column 2: Slides Down (Reverse) */}
          <div className="flex flex-col gap-6 overflow-hidden h-full">
            <div className="flex flex-col gap-6 animate-marquee-y-reverse">
              {[...col2, ...col2, ...col2].map((item, idx) => (
                <TestimonialCard key={`col2-${idx}`} item={item} />
              ))}
            </div>
          </div>

          {/* Column 3: Slides Up */}
          <div className="flex flex-col gap-6 overflow-hidden h-full">
            <div className="flex flex-col gap-6 animate-marquee-y">
              {[...col3, ...col3, ...col3].map((item, idx) => (
                <TestimonialCard key={`col3-${idx}`} item={item} />
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
