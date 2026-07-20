'use client'

import { motion } from 'framer-motion'

export default function FilterPillBar({ options, active, onChange }) {
  return (
    <div className="w-full overflow-hidden py-2">
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0 scroll-smooth">
        {options.map((option) => {
          const isActive = active === option
          return (
            <button
              key={option}
              onClick={() => onChange(option)}
              className={`relative font-sans text-sm px-6 py-2.5 rounded-full border cursor-pointer select-none transition-colors duration-300 flex-shrink-0 bg-transparent border-fg-border text-fg-body hover:border-fg-blue hover:text-fg-blue outline-none`}
            >
              {/* Sliding backdrop capsule */}
              {isActive && (
                <motion.span
                  layoutId="activePill"
                  className="absolute inset-0 bg-fg-blue rounded-full z-0"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {/* Text label */}
              <span className={`relative z-10 font-medium ${isActive ? 'text-white' : ''}`}>
                {option}
              </span>
            </button>
          )
        })}
      </div>

      {/* Hide default scrollbar styling */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}
