'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function ProductCTA() {
  return (
    <section className="py-0">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full bg-[#111111] py-24 sm:py-28 lg:py-32 px-6 sm:px-12 lg:px-24 text-center relative overflow-hidden"
      >
        {/* Animated ambient orbs */}
        <motion.div
          animate={{ x: [0, 30, -15, 0], y: [0, -25, 20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[10%] w-[350px] h-[350px] rounded-full bg-[#0E4FB3]/[0.06] blur-[100px] pointer-events-none"
        />
        <motion.div
          animate={{ x: [0, -20, 25, 0], y: [0, 30, -15, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] right-[10%] w-[300px] h-[300px] rounded-full bg-[#E8A840]/[0.05] blur-[80px] pointer-events-none"
        />

        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-[#0E4FB3] uppercase font-bold mb-5">
            Partner with FG Lifts
          </span>
          
          <h3 className="m-0 font-display text-3xl sm:text-4xl lg:text-[3.2rem] font-bold uppercase tracking-tight text-white leading-[1.1]">
            Join Rewards &amp; Discover <br />
            <span className="text-[#E8A840] italic font-normal font-serif tracking-normal lowercase first-letter:uppercase">Exclusive Options</span> On Your Project
          </h3>
          
          <p className="m-0 mt-5 text-sm sm:text-base text-white/50 font-normal leading-relaxed max-w-lg">
            Connect with our vertical engineering consultants today to access custom specifications, luxury design catalogs, and contract pricing configurations.
          </p>
          
          <Link 
            href="/contact"
            className="group mt-10 relative px-9 py-4 rounded-full bg-[#0E4FB3] text-white text-xs font-semibold tracking-wider uppercase transition-all duration-400 flex items-center gap-2.5 overflow-hidden shadow-[0_4px_20px_-6px_rgba(14,79,179,0.4)] hover:shadow-[0_12px_36px_-8px_rgba(14,79,179,0.5)] hover:scale-[1.03] no-underline"
          >
            <span className="relative z-10">Get a Free Consultation</span>
            <ArrowRight className="w-3.5 h-3.5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
            <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out" />
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
