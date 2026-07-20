'use client'

import { motion } from 'framer-motion'

const stats = [
  {
    value: '30+',
    label: 'Years Experience'
  },
  {
    value: '7000+',
    label: 'Lifts Installed'
  },
  {
    value: '95%',
    label: 'Repeat Customers'
  },
  {
    value: '3',
    label: 'MFG Facilities'
  },
  {
    value: '500+',
    label: 'Clients Nationwide'
  }
]

export default function StatsGrid() {
  return (
    <section className="w-full bg-[#111111] py-14 sm:py-20 select-none text-center border-t border-b border-white/5">
      <div className="max-w-[1380px] mx-auto px-6 lg:px-8">

        <div className="grid grid-cols-2 md:grid-cols-5 gap-y-10 md:gap-y-0 gap-x-6 md:gap-x-12">
          {stats.map((st, idx) => (
            <motion.div
              key={st.label}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: idx * 0.08 }}
              className="flex flex-col items-center col-span-1 first:col-span-1 last:col-span-2 md:last:col-span-1"
            >
              {/* Large number value in gold */}
              <span className="font-sans text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0797CE] leading-none">
                {st.value}
              </span>

              {/* Thin separator line */}
              <div className="w-12 h-[1px] bg-white/20 my-3" />

              {/* Small uppercase label */}
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.15em] text-white/50 uppercase font-bold leading-normal max-w-[140px]">
                {st.label}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
