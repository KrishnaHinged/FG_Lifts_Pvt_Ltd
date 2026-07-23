'use client'

import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'

const testimonials = [
  {
    quote: 'The AeroLux capsule elevator transformed our shopping atrium into a futuristic experience. Exceptional craftsmanship and incredibly silent operation.',
    name: 'Sonal Patel',
    initials: 'SP',
    role: 'Lead Architect, Surat',
    avatarGradient: 'bg-gradient-to-br from-[#0E4FB3] to-[#1A6BFF]',
  },
  {
    quote: 'Quiet, reliable, and highly energy-efficient. Our highrise residents love the smooth acceleration and deceleration of the Quantum gearless passenger lift.',
    name: 'Rajesh Mehta',
    initials: 'RM',
    role: 'Developer, Highrise Builders',
    avatarGradient: 'bg-gradient-to-br from-[#E8A840] to-[#E59A1B]',
  },
  {
    quote: 'Their 24/7 support team and commitment to strict safety standards made FG Lifts our primary vertical mobility partner for corporate warehouse developments.',
    name: 'Vikram Shah',
    initials: 'VS',
    role: 'Director, Apex Logistics',
    avatarGradient: 'bg-gradient-to-br from-[#333] to-[#111]',
  },
]

export default function ProductTestimonials() {
  return (
    <section className="py-24 px-6 sm:px-10 lg:px-16 bg-white border-t border-[#E8E2DA]/60">
      <div className="max-w-[1200px] mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] text-[#9A9A9A] uppercase mb-3 block">
            Testimonials
          </span>
          <h2 className="m-0 font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold uppercase tracking-tight text-[#111111]">
            What Our Clients Say
          </h2>
          <div className="w-12 h-[2px] bg-[#0E4FB3] mx-auto mt-5 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-[#F5F0EB]/40 border border-[#E8E2DA]/60 rounded-[1.75rem] p-7 sm:p-8 flex flex-col justify-between hover:shadow-[0_12px_40px_-10px_rgba(17,17,17,0.06)] hover:border-[#E8E2DA] transition-all duration-400 relative overflow-hidden"
            >
              {/* Quote mark */}
              <div className="absolute top-6 right-6 opacity-[0.04]">
                <Quote className="w-16 h-16 text-[#0E4FB3]" />
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-[#E8A840] fill-[#E8A840]" />
                ))}
              </div>

              <p className="m-0 text-sm sm:text-[15px] text-[#525252] leading-[1.75] font-normal relative z-10">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-[#E8E2DA]/50">
                <div className={`w-11 h-11 rounded-full ${t.avatarGradient} text-white flex items-center justify-center font-mono text-xs font-bold shadow-xs`}>
                  {t.initials}
                </div>
                <div>
                  <h5 className="m-0 font-sans text-sm font-semibold text-[#111111]">{t.name}</h5>
                  <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#9A9A9A]">{t.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
