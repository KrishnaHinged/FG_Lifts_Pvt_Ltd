'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Section from '@/components/layouts/Section'
import Container from '@/components/layouts/Container'
import Grid from '@/components/layouts/Grid'
import Heading from '@/components/typography/Heading'
import Paragraph from '@/components/typography/Paragraph'

const certifications = [
  {
    id: '01',
    label: 'ISO 9001:2015',
    title: 'Quality Management System',
    desc: 'Certified standards in vertical transportation engineering, design, and safe manufacturing.'
  },
  {
    id: '02',
    label: 'BIS Certified',
    title: 'Bureau of Indian Standards',
    desc: 'Meeting rigorous government criteria for component quality, safety, and testing.'
  },
  {
    id: '03',
    label: 'NSIC Registered',
    title: 'National Small Industries',
    desc: 'Officially recognized under the NSIC for high-performance domestic engineering.'
  },
  {
    id: '04',
    label: 'CPWD Approved',
    title: 'Government Contractor Grade',
    desc: 'Approved supplier for major central public works and infrastructure projects.'
  },
  {
    id: '05',
    label: 'Make in India',
    title: 'Local Manufacturing',
    desc: 'Active contributor to national self-reliance, utilizing premium local steel and electronics.'
  }
]

const partners = [
  { src: '/images/partners/partner-1.png', alt: 'Shiv Shakti Industries' },
  { src: '/images/partners/partner-2.png', alt: 'Torin Drive International' },
  { src: '/images/partners/partner-3.png', alt: 'Montanari Group' },
  { src: '/images/partners/partner-4.png', alt: 'Monarch by Inovance' },
  { src: '/images/partners/partner-5.png', alt: 'Wittur' },
  { src: '/images/partners/partner-6.png', alt: 'Fermator' },
  { src: '/images/partners/partner-7.png', alt: 'Usha Martin' },
  { src: '/images/partners/partner-8.png', alt: 'Arkel' },
  { src: '/images/partners/partner-9.png', alt: 'GMV India' }
]

export default function CertificationsStrip() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      }
    }
  }

  const slideUp = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <Section background="white" size="none" className="py-24 lg:py-32 relative overflow-hidden select-none">
      {/* Animated Gradient Orbs Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute -left-[10%] top-[10%] w-[500px] h-[500px] rounded-full opacity-[0.35]"
          style={{
            background: 'radial-gradient(circle, #d4e157 0%, #c5e1a5 40%, transparent 70%)',
            filter: 'blur(100px)',
            animation: 'floatBlob1 14s ease-in-out infinite',
          }}
        />
        <div
          className="absolute -right-[8%] bottom-[5%] w-[450px] h-[450px] rounded-full opacity-[0.30]"
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
        {/* Section 1: Certifications Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 lg:mb-20 max-w-3xl mx-auto"
        >
          <span className="inline-block font-mono text-[11px] tracking-[0.2em] text-[#0797CE] uppercase font-bold mb-4">
            ACCREDITATIONS &amp; STANDARDS
          </span>
          <Heading level="2" className="m-0 font-sans text-[clamp(36px,5.5vw,68px)] font-extrabold uppercase tracking-tight text-[#111111] leading-[1.05]">
            CERTIFIED QUALITY <br />
            <span className="text-[#0797CE]">TRUSTED PERFORMANCE</span>
          </Heading>
        </motion.div>

        {/* Layout Grid: Image Showcase + Quality Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mb-28 lg:mb-36">
          {/* Visual Showcase Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden border border-[#E8E2DA] shadow-xl bg-[#F8F6F2] group cursor-pointer"
          >
            <Image
              src="/images/about-certificates.jpg"
              alt="Physical Certificates and Awards Showcase"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              sizes="(max-width: 1024px) 100vw, 600px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl text-white">
              <p className="font-mono text-[9px] uppercase tracking-widest text-[#0797CE] m-0 font-bold">Physical Accreditations</p>
              <h4 className="text-sm font-sans font-bold uppercase tracking-tight m-0 mt-1 text-white">Gallery of Excellence</h4>
              <p className="text-[11px] text-white/70 m-0 mt-1">Our certified standards, government approvals, and appreciation awards displayed at our corporate offices.</p>
            </div>
          </motion.div>

          {/* Quality Credentials Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-between gap-4"
          >
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="flex items-start gap-4 p-5 rounded-2xl border border-[#E8E2DA] bg-white/70 backdrop-blur-xs hover:border-[#0797CE]/45 hover:bg-white hover:shadow-xs transition-all duration-300 group"
              >
                <span className="font-mono text-xs text-[#0797CE] font-bold tracking-widest shrink-0 pt-0.5">{cert.id}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <Heading level="3" className="font-sans text-base font-bold text-[#111111] uppercase tracking-tight m-0">{cert.label}</Heading>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#777777] bg-[#F8F6F2] border border-[#E8E2DA] px-2 py-0.5 rounded-sm">{cert.title}</span>
                  </div>
                  <Paragraph className="font-sans text-xs text-[#555555] leading-relaxed m-0 font-normal">{cert.desc}</Paragraph>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Section 2: Supply Chain Partners */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <span className="inline-block font-mono text-[11px] tracking-[0.2em] text-[#0797CE] uppercase font-bold mb-3">
            SUPPLY COMPONENT PARTNERS
          </span>
          <Heading level="2" className="m-0 font-sans text-3xl text-[#111111] font-bold uppercase tracking-tight">
            INTEGRATING WORLD-CLASS ENGINEERING
          </Heading>
        </motion.div>

        {/* Partners Logo Grid */}
        <Grid cols="5" className="gap-4 lg:gap-6">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              variants={slideUp}
              className="flex items-center justify-center p-6 bg-white/80 backdrop-blur-md border border-[#E8E2DA] rounded-2xl aspect-[1.8/1] shadow-2xs hover:shadow-xs hover:border-[#0797CE]/30 hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
            >
              <div className="relative w-full h-full transition-all duration-500">
                <Image
                  src={partner.src}
                  alt={partner.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 150px, 125px"
                />
              </div>
            </motion.div>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}
