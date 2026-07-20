'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const capabilities = [
  {
    num: '01',
    title: 'CNC Precision Manufacturing',
    desc: 'Laser-guided cutting and shaping with tolerances under 0.1mm'
  },
  {
    num: '02',
    title: 'Robotic Welding & Fabrication',
    desc: 'Automated MIG/TIG welding ensuring structural integrity on every joint'
  },
  {
    num: '03',
    title: 'Surface Finishing & Coating',
    desc: 'Powder coating, anodizing, and mirror polishing in a dust-controlled environment'
  },
  {
    num: '04',
    title: 'Load & Safety Testing',
    desc: 'Every system load-tested to 125% rated capacity before dispatch'
  }
]

export default function ManufacturingBlock() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      }
    }
  }

  const slideUp = {
    hidden: { y: 45, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  }

  const scaleIn = {
    hidden: { scale: 1.04, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <section className="bg-[#F5F0EB] py-32 px-6 lg:px-24 overflow-hidden select-none relative">


      {/* Ambient background glow */}
      <div className="absolute top-[40%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-[#0E4FB3]/[0.02] blur-[100px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        
        {/* Top: Mono label + Heading */}
        <div className="mb-16">
          <span className="block font-mono text-[9px] tracking-[0.2em] text-[#6B6B6B] uppercase mb-4 font-bold">
            Facilities &amp; Capacity
          </span>
          <h2 className="m-0 font-display text-4xl sm:text-5xl lg:text-7xl font-bold uppercase tracking-tight text-[#111111] max-w-3xl leading-[1.05]">
            Manufacturing Excellence <br />
            <span className="italic text-[#0E4FB3] font-light font-serif tracking-normal lowercase first-letter:uppercase">Built to Last</span>
          </h2>
        </div>

        {/* Highly Rounded Inset Image Card */}
        <motion.div 
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative w-full h-[40vh] sm:h-[50vh] md:h-[55vh] rounded-[2rem] sm:rounded-[3rem] overflow-hidden border border-[#E8E2DA] bg-[#EDE8E2]/50 shadow-md"
        >
          <Image
            src="/images/about-factory.png"
            alt="FG Lift Manufacturing Plant"
            fill
            className="object-cover"
            sizes="(max-w-[1200px]) 100vw, 1200px"
          />
          {/* Subtle vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          
          {/* Technical stamp badge */}
          <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl flex justify-between items-center text-white z-10">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-widest text-white/70 m-0">Primary Plant</p>
              <h4 className="text-sm font-display uppercase tracking-tight m-0 mt-0.5 font-normal">Surat, Gujarat &middot; India</h4>
            </div>
          </div>
        </motion.div>

        {/* Capability Cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((cap) => (
            <motion.div
              key={cap.num}
              variants={slideUp}
              className="bg-white border border-[#E8E2DA] p-6 lg:p-8 rounded-2xl hover:shadow-lg transition-shadow duration-300 group"
            >
              <span className="font-mono text-[10px] text-[#0E4FB3] font-bold block mb-4">{cap.num}</span>
              <h3 className="font-display text-lg lg:text-xl font-semibold text-[#111111] mb-2">{cap.title}</h3>
              <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed m-0">{cap.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}