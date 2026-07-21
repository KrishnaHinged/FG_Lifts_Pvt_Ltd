'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Section from '@/components/layouts/Section'
import Container from '@/components/layouts/Container'
import Heading from '@/components/typography/Heading'
import Paragraph from '@/components/typography/Paragraph'

export default function VisionMission() {
  const slideUp = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <Section background="white" size="none" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Animated Gradient Orbs */}
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

      <Container className="relative z-10 max-w-[1200px] flex flex-col gap-2 lg:gap-4">
        {/* Row 1: Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          <motion.div
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col justify-start pt-4 md:pt-6 lg:pt-8"
          >
            <Heading level="2" className="m-0 font-sans text-[clamp(40px,5vw,64px)] font-bold uppercase tracking-tight leading-[1.05] text-[#111111] mb-6">
              OUR MISSION
            </Heading>
            <Paragraph className="m-0 text-[17px] sm:text-[19px] text-[#444444] leading-[1.7] max-w-[480px]">
              We exceed customer expectations by providing reliable products, responsive service, and long-term value. Our mission is to deliver world-class elevator solutions with uncompromising quality, safety, and trust — empowering every partner to rise higher.
            </Paragraph>
          </motion.div>

          <motion.div
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative w-full min-h-[360px] md:min-h-[460px] rounded-2xl overflow-hidden"
          >
            <Image
              src="/images/elevator-gold.jpg"
              alt="Premium elevator cabin interior"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </div>

        {/* Row 2: Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch md:-mt-28 lg:-mt-36">
          <motion.div
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative w-full min-h-[360px] md:min-h-[460px] rounded-2xl overflow-hidden order-2 md:order-1"
          >
            <Image
              src="/images/elevator-steel.jpg"
              alt="Modern steel elevator installation"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>

          <motion.div
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col justify-end py-4 md:py-6 lg:py-8 order-1 md:order-2"
          >
            <Heading level="2" className="m-0 font-sans text-[clamp(40px,5vw,64px)] font-bold uppercase tracking-tight leading-[1.05] text-[#111111] mb-6">
              OUR VISION
            </Heading>
            <Paragraph className="m-0 text-[17px] sm:text-[19px] text-[#444444] leading-[1.7] max-w-[480px]">
              We aspire to be the most trusted partner for intelligent transit systems by creating safer and more sustainable transportation for modern cities — empowering people to connect, move, and thrive in a taller, faster, and smarter world.
            </Paragraph>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}