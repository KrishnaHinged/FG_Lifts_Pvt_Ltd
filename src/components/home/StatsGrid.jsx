'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import Section from '@/components/layouts/Section'
import Container from '@/components/layouts/Container'

const stats = [
  { value: '30+', label: 'Years Experience' },
  { value: '7000+', label: 'Lifts Installed' },
  { value: '95%', label: 'Repeat Customers' },
  { value: '3', label: 'MFG Facilities' },
  // { value: '500+', label: 'Clients Nationwide' }
]

function AnimatedCounter({ valueString }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" })
  const [displayValue, setDisplayValue] = useState(0)

  // Parse string once, extract primitive dependencies
  const match = valueString.match(/^(\D*)(\d+)(\D*)$/)
  const prefix = match ? match[1] : ''
  const endValue = match ? parseInt(match[2], 10) : null
  const suffix = match ? match[3] : ''

  useEffect(() => {
    if (isInView && endValue !== null) {
      const controls = animate(0, endValue, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate(value) {
          setDisplayValue(Math.floor(value))
        }
      })
      return () => controls.stop()
    }
  }, [isInView, endValue])

  // Fallback if the string doesn't contain a number
  if (endValue === null) return <span ref={ref}>{valueString}</span>

  return (
    <span ref={ref}>
      {prefix}{displayValue}{suffix}
    </span>
  )
}

export default function StatsGrid() {
  return (
    <Section background="dark" size="none" className="py-14 sm:py-20 select-none text-center border-t border-b border-white/5">
      <Container className="max-w-[1380px]">
        <div className="flex flex-wrap justify-center gap-10 md:gap-16 lg:gap-24">
          {stats.map((st, idx) => (
            <motion.div
              key={st.label}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: idx * 0.08 }}
              className="flex flex-col items-center w-[140px] md:w-[180px]"
            >
              <span className="font-sans text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0797CE] leading-none">
                <AnimatedCounter valueString={st.value} />
              </span>

              <div className="w-12 h-[1px] bg-white/20 my-3" />

              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.15em] text-white/50 uppercase font-bold leading-normal max-w-[140px] text-center">
                {st.label}
              </span>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
