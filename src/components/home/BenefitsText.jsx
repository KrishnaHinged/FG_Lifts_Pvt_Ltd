'use client'

import { useRef, memo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Building2, Sparkles, Users } from 'lucide-react'
import Section from '@/components/layouts/Section'
import Container from '@/components/layouts/Container'

const items = [
  { type: 'word', text: 'When' },
  { type: 'word', text: 'designing' },
  { type: 'word', text: 'a' },
  { type: 'word', text: 'building,' },
  { type: 'icon', icon: 'building' },
  { type: 'word', text: 'you' },
  { type: 'word', text: 'are' },
  { type: 'word', text: 'also' },
  { type: 'word', text: 'designing' },
  { type: 'word', text: 'a' },
  { type: 'word', text: 'gateway' },
  { type: 'word', text: 'where' },
  { type: 'word', text: 'seamless' },
  { type: 'icon', icon: 'spark' },
  { type: 'word', text: 'transitions' },
  { type: 'word', text: 'will' },
  { type: 'word', text: 'be' },
  { type: 'word', text: 'experienced' },
  { type: 'word', text: 'by' },
  { type: 'word', text: 'people' },
  { type: 'icon', icon: 'people' },
  { type: 'word', text: 'every' },
  { type: 'word', text: 'day.' }
]

const ScrollItem = memo(function ScrollItem({ item, index, progress }) {
  const start = 0.1 + (index * 0.02)
  const end = start + 0.04
  const opacity = useTransform(progress, [start, end], [0.2, 1])

  if (item.type === 'icon') {
    return (
      <motion.span style={{ opacity }} className="inline-flex items-center mx-2.5 sm:mx-4 select-none">
        {item.icon === 'building' && (
          <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-[#E8F5E9] border border-[#A8E680]/30 flex items-center justify-center text-[#0797CE]">
            <Building2 className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
          </div>
        )}
        {item.icon === 'spark' && (
          <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-[#F3E5F5] border border-[#D1C4E9]/30 flex items-center justify-center text-[#0797CE]">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
          </div>
        )}
        {item.icon === 'people' && (
          <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-[#E3F2FD] border border-[#BBDEFB]/30 flex items-center justify-center text-[#2196F3]">
            <Users className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
          </div>
        )}
      </motion.span>
    )
  }

  return (
    <motion.span
      style={{ opacity }}
      className="inline-block mr-2.5 sm:mr-4 font-sans text-3xl sm:text-5xl lg:text-[4rem] font-light tracking-tight text-[#111111] leading-tight sm:leading-relaxed"
    >
      {item.text}
    </motion.span>
  )
})

export default function BenefitsText() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  return (
    <Section
      ref={containerRef}
      background="cream"
      size="default"
      className="select-none border-b border-[#E8E2DA]"
    >
      {/* Soft Zestate-style Glowing Gradient Balls */}
      <div className="absolute top-[10%] left-[-15%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(168,230,120,0.18)_0%,transparent_70%)] blur-[80px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] right-[-15%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(165,124,240,0.15)_0%,transparent_70%)] blur-[80px] pointer-events-none z-0" />

      <Container className="relative z-10 max-w-[1380px] mx-auto">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-start">
          {items.map((item, idx) => (
            <ScrollItem
              key={idx}
              item={item}
              index={idx}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </Container>
    </Section>
  )
}
