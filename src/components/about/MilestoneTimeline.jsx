'use client'

import { motion } from 'framer-motion'
import Section from '@/components/layouts/Section'
import Container from '@/components/layouts/Container'
import Heading from '@/components/typography/Heading'
import Paragraph from '@/components/typography/Paragraph'

const milestones = [
  { year: '1993', title: 'Firozgar Elevator Established', desc: 'Inception of Firozgar Elevator, laying the foundation of precision engineering.', highlight: true },
  { year: '1995', title: 'Geared Machine with Reed System', desc: 'Introduced advanced geared machines integrated with reed magnetic sensing.' },
  { year: '1998', title: 'Relay Panel Technology', desc: 'Transitioned to automated relay control panels for enhanced reliability.' },
  { year: '2001', title: 'First Auto Door Elevator', desc: 'Successfully engineered and installed our first fully automatic door system.' },
  { year: '2003', title: 'Drive Controller Integration', desc: 'Adopted variable frequency drive controllers for smooth acceleration.' },
  { year: '2005', title: '2,000+ Installations Landmark', desc: 'Crossed the 2,000 elevator milestone across commercial and residential sites.', highlight: true },
  { year: '2007', title: 'First Car Elevator Installed', desc: 'Expanded into heavy-duty automotive and heavy load vertical mobility.' },
  { year: '2009', title: 'Emergency Rescue Device (ARD)', desc: 'Standardized automatic rescue devices ensuring passenger safety during power cuts.' },
  { year: '2010', title: '3,000+ Installations Landmark', desc: 'Surpassed 3,000 active elevator installations across Western India.' },
  { year: '2011', title: 'Own Manufacturing Unit', desc: 'Established our primary state-of-the-art manufacturing plant in Surat.', highlight: true },
  { year: '2012', title: 'Touch Panel LOP/COP Buttons', desc: 'Introduced sleek capacitive glass touch operating panels.' },
  { year: '2013', title: 'Gearless Machine Adoption', desc: 'Engineered high-efficiency permanent magnet gearless traction machines.' },
  { year: '2015', title: 'First 18-Stop Elevator (1.75 m/s)', desc: 'Deployed high-speed 1.75 m/s elevators for multi-story towers.' },
  { year: '2016', title: 'Fire-Rated Auto Doors', desc: 'Introduced certified fire-rated door assemblies meeting safety standards.' },
  { year: '2018', title: 'Firozger Elevator Industries', desc: 'Rebranded to Firozger Elevator Industries to reflect growing scale.' },
  { year: '2019', title: 'Digital Control System', desc: 'Pioneered micro-processor based digital elevator management systems.' },
  { year: '2021', title: '22-Floor 2-Ton Heavy Lift', desc: 'Installed high-capacity 2-ton elevators reaching 22 floors.' },
  { year: '2022', title: 'Vapi Branch Office', desc: 'Opened dedicated sales and support hub in Vapi to serve industrial corridors.' },
  { year: '2023', title: 'Firozger Elevator Pvt. Ltd.', desc: 'Incorporated as a Private Limited Company (Firozger Elevator Pvt. Ltd.).', highlight: true },
  { year: '2024', title: 'Indore Branch Office', desc: 'Expanded operations into Madhya Pradesh with a new branch in Indore.' },
  { year: '2026', title: 'Rebranded to FG Lifts Pvt. Ltd.', desc: 'Evolved into FG Lifts Pvt. Ltd., representing modern luxury vertical mobility.', highlight: true }
]

export default function MilestoneTimeline() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      }
    }
  }

  const cardVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <Section background="white" size="none" className="py-24 lg:py-32 relative select-none overflow-hidden">
      <Container className="max-w-[1280px] relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 lg:mb-24 max-w-3xl mx-auto"
        >
          <span className="inline-block font-mono text-[11px] tracking-[0.2em] text-[#0797CE] uppercase font-bold mb-4">
            OUR JOURNEY // 1993 – 2026
          </span>
          <Heading level="2" className="m-0 font-sans text-[clamp(36px,5.5vw,68px)] font-extrabold uppercase tracking-tight text-[#111111] leading-[1.05]">
            OVER THREE DECADES OF <br />
            <span className="text-[#0797CE]">MILESTONES &amp; INNOVATION</span>
          </Heading>
        </motion.div>

        {/* Vertical Timeline Structure */}
        <div className="relative">
          {/* Central Vertical Spine Line (Desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-[2px] bg-gradient-to-b from-[#0797CE] via-[#0797CE]/30 to-[#0797CE]" />

          {/* Left Line (Mobile) */}
          <div className="lg:hidden absolute left-4 top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#0797CE] via-[#0797CE]/30 to-[#0797CE]" />

          {/* Milestone Items Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            className="flex flex-col space-y-8 lg:space-y-12"
          >
            {milestones.map((item, index) => {
              const isEven = index % 2 === 0

              return (
                <motion.div
                  key={item.year}
                  variants={cardVariants}
                  className={`relative flex flex-col lg:flex-row items-center ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Spine Node Dot */}
                  <div className="absolute left-4 lg:left-1/2 top-6 -translate-x-1/2 w-4 h-4 rounded-full bg-[#0797CE] ring-4 ring-[#0797CE]/20 z-20 shadow-md" />

                  {/* Card Wrapper */}
                  <div className={`w-full lg:w-1/2 pl-12 lg:pl-0 ${
                    isEven ? 'lg:pr-12 lg:text-right' : 'lg:pl-12 lg:text-left'
                  }`}>
                    <div className={`p-6 sm:p-8 rounded-2xl sm:rounded-3xl border transition-all duration-300 group shadow-xs hover:shadow-md ${
                      item.highlight
                        ? 'bg-[#1c1c1c] text-white border-[#0797CE]/60 hover:border-[#0797CE]'
                        : 'bg-[#F8F6F2] text-[#111111] border-[#E8E2DA] hover:border-[#0797CE]/40'
                    }`}>
                      <div className={`flex items-center gap-3 mb-3 ${
                        isEven ? 'lg:justify-end' : 'lg:justify-start'
                      }`}>
                        <span className="font-mono font-extrabold text-2xl lg:text-3xl text-[#0797CE]">
                          {item.year}
                        </span>

                        {item.highlight && (
                          <span className="font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-md bg-[#0797CE]/20 text-[#0797CE] font-bold border border-[#0797CE]/40">
                            KEY MILESTONE
                          </span>
                        )}
                      </div>

                      <Heading level="3" className={`m-0 font-sans text-lg lg:text-xl font-bold uppercase tracking-tight leading-snug mb-2 ${
                        item.highlight ? 'text-white' : 'text-[#111111]'
                      }`}>
                        {item.title}
                      </Heading>

                      <Paragraph className={`m-0 font-sans text-sm sm:text-base leading-relaxed font-normal ${
                        item.highlight ? 'text-white/70' : 'text-[#555555]'
                      }`}>
                        {item.desc}
                      </Paragraph>
                    </div>
                  </div>

                  {/* Empty Spacer Half */}
                  <div className="hidden lg:block w-1/2" />
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
