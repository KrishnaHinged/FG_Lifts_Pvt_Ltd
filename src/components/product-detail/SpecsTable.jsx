'use client'

import { motion } from 'framer-motion'
import { Gauge, Zap, Settings, Layers, Ruler, Weight, ArrowUpDown, Box } from 'lucide-react'

const specIconMap = {
  'capacity': Weight,
  'speed': Zap,
  'drive type': Settings,
  'drive': Settings,
  'max floors': Layers,
  'floors': Layers,
  'dimensions': Ruler,
  'weight': Weight,
  'power': Gauge,
  'travel': ArrowUpDown,
}

function getSpecIcon(key) {
  const lowerKey = key.toLowerCase()
  for (const [keyword, Icon] of Object.entries(specIconMap)) {
    if (lowerKey.includes(keyword)) return Icon
  }
  return Box
}

export default function SpecsTable({ specifications = [] }) {
  if (!specifications || specifications.length === 0) return null

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-5 rounded-full bg-[#0E4FB3]" />
        <h3 className="m-0 font-display text-lg font-bold uppercase tracking-wide text-[#111111]">
          Technical Specifications
        </h3>
      </div>

      <div className="w-full bg-white border border-[#E8E2DA]/80 rounded-[1.25rem] overflow-hidden shadow-xs">
        {specifications.map((spec, index) => {
          const Icon = getSpecIcon(spec.key)
          const isLast = index === specifications.length - 1

          return (
            <motion.div
              key={spec.key}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`grid grid-cols-12 items-center py-4 px-5 sm:px-6 gap-3 ${
                !isLast ? 'border-b border-[#E8E2DA]/50' : ''
              } hover:bg-[#F5F0EB]/30 transition-colors duration-200`}
            >
              {/* Icon */}
              <div className="col-span-1 flex items-center justify-center">
                <div className="w-7 h-7 rounded-lg bg-[#0E4FB3]/[0.06] flex items-center justify-center">
                  <Icon className="w-3.5 h-3.5 text-[#0E4FB3]" />
                </div>
              </div>

              {/* Spec Key */}
              <span className="col-span-4 sm:col-span-3 font-mono text-[9px] uppercase tracking-[0.18em] text-[#9A9A9A] font-semibold">
                {spec.key}
              </span>

              {/* Spec Value */}
              <span className="col-span-7 sm:col-span-8 font-sans text-[#111111] text-sm font-semibold text-right sm:text-left">
                {spec.value}
              </span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
