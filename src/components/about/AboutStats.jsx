'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

function Counter({ target, duration = 1500 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

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

  return <span ref={ref}>{count.toLocaleString()}</span>
}

const stats = [
  { value: 30, label: 'Years in Industry' },
  { value: 500, label: 'Projects Completed' },
  { value: 30, label: 'Cities Served' },
  { value: 2000, label: 'Lifts Installed' },
]

export default function AboutStats() {
  return (
    <section className="bg-[#F5F0EB] py-24 px-6 lg:px-24 select-none relative">


      <div className="max-w-[1200px] mx-auto">
        {/* Top horizontal rule */}
        <div className="w-full h-px bg-[#E8E2DA] mb-20" />

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="flex flex-col items-start lg:border-r border-[#E8E2DA] last:border-r-0 lg:pr-8"
            >
              {/* Number and Suffix side by side */}
              <div className="flex items-baseline">
                <span className="font-mono text-6xl lg:text-7xl text-[#111111] leading-none font-bold">
                  <Counter target={stat.value} />
                </span>
                <span className="font-display text-2xl lg:text-3xl text-[#0E4FB3] ml-1 font-bold">
                  +
                </span>
              </div>

              {/* Label */}
              <span className="font-mono text-[10px] text-[#6B6B6B] tracking-[0.2em] uppercase mt-4 block font-semibold">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom horizontal rule */}
        <div className="w-full h-px bg-[#E8E2DA] mt-20" />
      </div>
    </section>
  )
}
