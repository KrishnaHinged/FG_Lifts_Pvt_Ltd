'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const board = [
  {
    name: 'Janak J Variya',
    title: 'Director of Engineering & Customization',
    bio: 'Leads our customization engine and mechanical specifications. Speeds up delivery by solving spatial shaft puzzles and designing bespoke elevator layouts.',
    image: '/images/janak-bhai.jpg'
  },
  {
    name: 'Jay Krushna B Patel',
    title: 'Director of Operations & Delivery',
    bio: 'Oversees logistics orchestration, structural assembly coordination, and builder relations. Dedicated to scheduling precision and operational excellence.',
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
    <section className="px-4 sm:px-6 lg:px-8 py-8 bg-white">
      <div className="relative w-full bg-[#1a1a1a] rounded-[2rem] sm:rounded-[3rem] overflow-hidden py-20 sm:py-28 lg:py-36 px-6 sm:px-10 lg:px-16">

        <div className="max-w-[1200px] mx-auto relative z-10">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mb-20 lg:mb-28"
          >
            <h2 className="m-0 font-sans text-[clamp(36px,5vw,64px)] font-bold uppercase tracking-tight leading-[1.1] text-white text-center">
              MEET OUR <span className="text-[#0797CE] ">LEADERS</span>
            </h2>
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
                    className={`relative w-full aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-[#2a2a2a] cursor-pointer group ${isEven ? 'md:order-1' : 'md:order-2'
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
                    className={`w-full flex flex-col items-start px-2 sm:px-6 md:px-0 ${isEven ? 'md:order-2' : 'md:order-1'
                      }`}
                  >
                    <h3 className="m-0 font-sans text-2xl sm:text-3xl text-white font-bold leading-tight">
                      {director.name}
                    </h3>
                    <span className="font-sans text-[11px] sm:text-xs text-[#0797CE] tracking-[0.15em] uppercase mt-1.5 font-bold">
                      {director.title}
                    </span>

                    {/* Accent line */}
                    <div className="w-12 h-[2px] bg-[#0797CE] mt-4 mb-5" />

                    <p className="font-sans text-sm sm:text-base text-white/60 leading-relaxed max-w-[420px] font-normal italic">
                      {director.bio}
                    </p>
                  </motion.div>
                </div>
              )
            })}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
