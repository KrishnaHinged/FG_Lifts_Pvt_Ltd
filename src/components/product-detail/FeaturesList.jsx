'use client'

import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

export default function FeaturesList({ features = [] }) {
  if (!features || features.length === 0) return null

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      }
    }
  }

  const childVariants = {
    hidden: { y: 25, opacity: 0, scale: 0.97 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1 h-5 rounded-full bg-[#0E4FB3]" />
        <h3 className="m-0 font-display text-lg font-bold uppercase tracking-wide text-[#111111]">
          Key Features &amp; Systems
        </h3>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature}
            variants={childVariants}
            className="group flex items-start gap-4 bg-white border border-[#E8E2DA]/60 p-5 rounded-[1.25rem] hover:shadow-[0_8px_30px_-10px_rgba(14,79,179,0.08)] hover:border-[#0E4FB3]/15 transition-all duration-300"
          >
            {/* Checkmark icon wrapper */}
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-[#0E4FB3]/10 to-[#0E4FB3]/[0.04] flex items-center justify-center mt-0.5 group-hover:from-[#0E4FB3]/20 group-hover:to-[#0E4FB3]/10 transition-all duration-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#0E4FB3]" />
            </div>
            <span className="font-sans text-sm text-[#525252] font-medium leading-relaxed group-hover:text-[#111111] transition-colors duration-300">
              {feature}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
