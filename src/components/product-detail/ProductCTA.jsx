'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Download, MessageCircle } from 'lucide-react'

export default function ProductCTA({ brochureUrl, productName }) {
  
  const handleScrollToContact = (e) => {
    e.preventDefault()
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.hash = 'contact'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white border border-[#E8E2DA]/80 rounded-[1.75rem] p-7 sm:p-8 flex flex-col gap-6 w-full shadow-[0_4px_20px_-6px_rgba(17,17,17,0.05)] relative overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute -top-10 -right-10 w-[200px] h-[200px] rounded-full bg-[#0E4FB3]/[0.02] blur-[60px] pointer-events-none" />

      <div className="relative z-10">
        <h3 className="m-0 font-display text-2xl font-bold uppercase tracking-tight text-[#111111] leading-tight mb-2">
          Interested in this system?
        </h3>
        <p className="m-0 text-sm text-[#6B6B6B] leading-relaxed font-normal max-w-sm">
          Request detailed layout specifications, customize cabin configurations, or consult directly with our lift design engineers.
        </p>
      </div>

      <div className="relative z-10 flex flex-col gap-3 w-full">
        {/* Primary - Request a Quote */}
        <button
          onClick={handleScrollToContact}
          className="group w-full bg-[#111111] text-white py-4 px-6 rounded-xl font-sans font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2.5 cursor-pointer border-none transition-all duration-400 hover:bg-[#0E4FB3] hover:shadow-[0_12px_30px_-8px_rgba(14,79,179,0.4)] hover:scale-[1.01] outline-none"
        >
          <span>Request a Quote</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </button>

        {/* Secondary - Download Brochure */}
        {brochureUrl && (
          <a
            href={brochureUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group w-full border border-[#E8E2DA] bg-[#F5F0EB]/20 hover:bg-[#F5F0EB]/60 text-[#111111] py-4 px-6 rounded-xl font-sans font-semibold text-xs tracking-wider uppercase text-center no-underline flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-[1.01] hover:border-[#E8E2DA]"
          >
            <span>Download Brochure</span>
            <Download className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>
        )}

        {/* Divider */}
        <div className="w-full h-px bg-[#E8E2DA]/50 my-1" />

        {/* Whatsapp consult link */}
        <a
          href={`https://wa.me/919825000000?text=${encodeURIComponent(
            `Hi, I am interested in the ${productName || 'FG Lift system'}. Please share the technical brochure and spec options.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group w-full flex items-center justify-center gap-2.5 bg-[#25D366]/[0.06] hover:bg-[#25D366]/[0.12] border border-[#25D366]/15 hover:border-[#25D366]/30 text-[#111111] py-3 px-5 rounded-xl font-mono text-[10px] uppercase tracking-[0.15em] font-bold no-underline transition-all duration-300 hover:scale-[1.01]"
        >
          <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
          <span>Consult Engineer via WhatsApp</span>
        </a>
      </div>
    </motion.div>
  )
}
