'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Section from '@/components/layouts/Section'
import Container from '@/components/layouts/Container'
import Heading from '@/components/typography/Heading'
import Paragraph from '@/components/typography/Paragraph'

const board = [
  {
    name: 'Janak J Variya',
    title: 'Director',
    bio: 'Mr. Janak, a Mechanical Engineer, brings over 15 years of experience in elevator sales, installation, maintenance, and servicing. He believes that "A lift is the heart of a building." Just as the heart needs proper care, every elevator requires expert installation and regular maintenance to perform safely and efficiently. He believes that timely service by experienced professionals is essential for the long life of every lift. This philosophy became the foundation of FG Lifts Pvt. Ltd., where quality, safety, and customer trust come first. Mr. Janak is also a strong supporter of the Make in India vision and believes in promoting high-quality Indian engineering. Under his leadership, every project is completed with precision, transparency, and long-term commitment. Today, FG Lifts Pvt. Ltd. proudly serves clients across South Gujarat and two Indian states. His vision is to expand the companys presence and become a trusted elevator brand across all of India. For him, every elevator is more than a machine it is a responsibility to keep the heartbeat of every building running safely.',
    image: '/images/janak-bhai.jpg'
  },
  {
    name: 'Jay Krushna B Patel',
    title: 'Director',
    bio: 'Mr. Jay Patel, Director of FG Lifts Pvt. Ltd., brings over 30 years of experience in the elevator industry. Having built his expertise through his journey with Firozgar Elevators, he possesses deep technical knowledge and hands-on experience in vertical transportation. He believes that every elevator should be designed, installed, and maintained with uncompromising quality and safety. His approach combines engineering precision, practical expertise, and a strong customer-first mindset in every project. He is committed to delivering reliable elevator solutions that ensure long-term performance and peace of mind. Mr. Jay Patel believes that lasting success is built through transparency, trust, and dependable after-sales service. He also strongly supports the Make in India vision and believes in showcasing the strength of Indian engineering and manufacturing. Under his leadership, FG Lifts Pvt. Ltd. proudly serves residential, commercial, industrial, healthcare, and institutional projects across multiple regions. His vision is to expand the companys presence and establish FG Lifts Pvt. Ltd. as a trusted elevator brand across India. For him, every elevator is more than a product—it is a promise of safety, reliability, innovation, and excellence.',
    image: '/images/jay-bhai.jpg'
  }
]

export default function Leadership() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      }
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

  const slideUp = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <Section background="white" size="none" className="px-4 sm:px-6 lg:px-8 py-8 bg-white">
      <div className="relative w-full bg-[#1a1a1a] rounded-[2rem] sm:rounded-[3rem] overflow-hidden py-20 sm:py-28 lg:py-36 px-6 sm:px-10 lg:px-16">
        <Container className="max-w-[1200px] relative z-10">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mb-20 lg:mb-28"
          >
            <Heading level="2" className="m-0 font-sans text-[clamp(36px,5vw,64px)] font-bold uppercase tracking-tight leading-[1.1] text-white text-center">
              MEET OUR <span className="text-[#0797CE] ">LEADERS</span>
            </Heading>
          </motion.div>

          {/* Board List (Alternating Zigzag Layout) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="flex flex-col gap-24 lg:gap-32 max-w-[960px] mx-auto"
          >
            {board.map((director, index) => {
              const isEven = index % 2 === 0

              return (
                <div key={director.name} className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-center">
                  {/* Highly Rounded Image Frame */}
                  <motion.div
                    variants={scaleIn}
                    className={`relative w-full aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-[#2a2a2a] cursor-pointer group ${
                      isEven ? 'md:order-1' : 'md:order-2'
                    }`}
                  >
                    <Image
                      src={director.image}
                      alt={director.name}
                      fill
                      className="object-cover object-top group-hover:scale-[1.02]"
                      style={{
                        transition: 'all 1.2s cubic-bezier(0.25, 1, 0.5, 1)'
                      }}
                      sizes="(max-width: 768px) 100vw, 480px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.div>

                  {/* Details Content */}
                  <motion.div
                    variants={slideUp}
                    className={`w-full flex flex-col items-start px-2 sm:px-6 md:px-0 ${
                      isEven ? 'md:order-2' : 'md:order-1'
                    }`}
                  >
                    <Heading level="3" className="m-0 font-sans text-2xl sm:text-3xl text-white font-bold leading-tight">
                      {director.name}
                    </Heading>
                    <span className="font-sans text-[11px] sm:text-xs text-[#0797CE] tracking-[0.15em] uppercase mt-1.5 font-bold">
                      {director.title}
                    </span>

                    <div className="w-12 h-[2px] bg-[#0797CE] mt-4 mb-5" />

                    <Paragraph className="font-sans text-sm sm:text-base text-white/60 leading-relaxed max-w-[420px] font-normal italic">
                      {director.bio}
                    </Paragraph>
                  </motion.div>
                </div>
              )
            })}
          </motion.div>
        </Container>
      </div>
    </Section>
  )
}
