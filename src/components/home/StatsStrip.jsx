'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

function useCounter(target, duration = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (!isInView) return

    let startTime = null
    let frame

    function step(timestamp) {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Cubic out easing curve
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(easeOutCubic * target))

      if (progress < 1) {
        frame = requestAnimationFrame(step)
      } else {
        setCount(target)
      }
    }

    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [isInView, target, duration])

  return { count, ref }
}

const stats = [
  { value: 30, suffix: '+', label: 'Years in Industry' },
  { value: 500, suffix: '+', label: 'Projects Completed' },
  { value: 30, suffix: '+', label: 'Cities Served' },
  { value: 2000, suffix: '+', label: 'Lifts Installed' },
]

function StatItem({ value, suffix, label, index }) {
  const { count, ref } = useCounter(value, 2000)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={`flex flex-col items-center py-8 lg:py-12 ${
        index < stats.length - 1 ? 'lg:border-r lg:border-white/10' : ''
      }`}
    >
      <span className="font-mono text-5xl lg:text-7xl font-bold text-fg-cream tracking-tight leading-[0.9] whitespace-nowrap">
        {count.toLocaleString()}{suffix}
      </span>
      <span className="font-sans text-sm tracking-[0.15em] md:tracking-[0.35em] uppercase text-fg-muted mt-3">
        {label}
      </span>
    </motion.div>
  )
}

export default function StatsStrip() {
  return (
    <section className="bg-fg-dark border-t border-white/10 border-b border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} {...stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
