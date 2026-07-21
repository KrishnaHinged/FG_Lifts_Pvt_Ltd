'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Section from '@/components/layouts/Section'
import Container from '@/components/layouts/Container'
import Grid from '@/components/layouts/Grid'
import Heading from '@/components/typography/Heading'
import Paragraph from '@/components/typography/Paragraph'

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
    hidden: { y: 35, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <Section background="white" size="none" className="py-24 lg:py-32 relative overflow-hidden select-none">
      {/* Animated Gradient Orbs Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute -left-[10%] top-[15%] w-[500px] h-[500px] rounded-full opacity-[0.35]"
          style={{
            background: 'radial-gradient(circle, #d4e157 0%, #c5e1a5 40%, transparent 70%)',
            filter: 'blur(100px)',
            animation: 'floatBlob1 14s ease-in-out infinite',
          }}
        />
        <div
          className="absolute -right-[8%] top-[25%] w-[450px] h-[450px] rounded-full opacity-[0.30]"
          style={{
            background: 'radial-gradient(circle, #ce93d8 0%, #e1bee7 40%, transparent 70%)',
            filter: 'blur(100px)',
            animation: 'floatBlob2 16s ease-in-out infinite',
          }}
        />
      </div>

      <style jsx>{`
        @keyframes floatBlob1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -30px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.97); }
        }
        @keyframes floatBlob2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-35px, 25px) scale(1.06); }
          66% { transform: translate(25px, -35px) scale(0.95); }
        }
      `}</style>

      <Container className="relative z-10 max-w-[1280px]">
        {/* Centered Top Heading Block */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 lg:mb-20 max-w-4xl mx-auto"
        >
          <span className="inline-block font-mono text-[11px] tracking-[0.2em] text-[#0797CE] uppercase font-bold mb-4">
            FACILITIES &amp; CAPACITY
          </span>
          <Heading level="2" className="m-0 font-sans text-[clamp(36px,5.5vw,68px)] font-extrabold uppercase tracking-tight text-[#111111] leading-[1.05]">
            MANUFACTURING EXCELLENCE <br />
            <span className="text-[#0797CE]">BUILT TO LAST</span>
          </Heading>
        </motion.div>

        {/* Zestate-Style 3-Image Combo Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-end mb-20"
        >
          {/* Image 1: Left Tall Card */}
          <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden border border-[#E8E2DA] shadow-lg bg-[#EDE8E2] group">
            <Image
              src="/images/about-factory.png"
              alt="Primary Manufacturing Plant - Surat, Gujarat"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-3 rounded-xl text-white">
              <p className="font-mono text-[9px] uppercase tracking-widest text-white/70 m-0 font-bold">Primary Plant</p>
              <h4 className="text-xs font-sans font-bold uppercase tracking-tight m-0 mt-0.5 text-white">Surat, Gujarat</h4>
            </div>
          </div>

          {/* Image 2: Center Shorter Card */}
          <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden border border-[#E8E2DA] shadow-lg bg-[#EDE8E2] group">
            <Image
              src="/images/elevator-gold.jpg"
              alt="Precision Elevator Cabin Interior"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-3 rounded-xl text-white">
              <p className="font-mono text-[9px] uppercase tracking-widest text-white/70 m-0 font-bold">Quality Craftsmanship</p>
              <h4 className="text-xs font-sans font-bold uppercase tracking-tight m-0 mt-0.5 text-white">Bespoke Cabins</h4>
            </div>
          </div>

          {/* Image 3: Right Tall Card */}
          <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden border border-[#E8E2DA] shadow-lg bg-[#EDE8E2] group">
            <Image
              src="/images/elevator-steel.jpg"
              alt="Precision Elevator Installation"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-3 rounded-xl text-white">
              <p className="font-mono text-[9px] uppercase tracking-widest text-white/70 m-0 font-bold">Structural Precision</p>
              <h4 className="text-xs font-sans font-bold uppercase tracking-tight m-0 mt-0.5 text-white">Modular Shafts</h4>
            </div>
          </div>
        </motion.div>

        {/* Capability Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {capabilities.map((cap) => (
            <motion.div
              key={cap.num}
              variants={slideUp}
              className="bg-white/90 backdrop-blur-md border border-[#E8E2DA] p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-xs hover:shadow-md hover:border-[#0797CE]/40 transition-all duration-300 hover:-translate-y-1 group"
            >
              <span className="font-mono text-xs text-[#0797CE] font-bold block mb-4 tracking-widest">{cap.num}</span>
              <Heading level="3" className="font-sans text-lg lg:text-xl font-bold text-[#111111] mb-2 uppercase tracking-tight leading-tight">{cap.title}</Heading>
              <Paragraph className="font-sans text-sm text-[#555555] leading-relaxed m-0 font-normal">{cap.desc}</Paragraph>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  )
}