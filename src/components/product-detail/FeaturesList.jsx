'use client'

import { motion } from 'framer-motion'

export default function FeaturesList({ features = [] }) {
  if (!features || features.length === 0) return null

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05
      }
    }
  }

  const childVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <div className="w-full">
      <h3 className="m-0 font-display text-base font-bold uppercase tracking-wide text-[#111111] mb-6">
        Key Features & Systems
      </h3>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {features.map((feature) => (
          <motion.div
            key={feature}
            variants={childVariants}
            className="flex items-start gap-4 bg-white border border-[#E8E2DA]/50 p-5 rounded-[1.5rem] hover:shadow-xs transition-shadow duration-200"
          >
            {/* Checkmark icon wrapper */}
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#0E4FB3]/5 flex items-center justify-center mt-0.5">
              <svg className="w-3 h-3 text-[#0E4FB3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="font-sans text-sm text-[#6B6B6B] font-medium leading-relaxed">
              {feature}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
