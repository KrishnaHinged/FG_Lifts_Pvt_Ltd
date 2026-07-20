'use client'

import { motion } from 'framer-motion'
import { fadeUpVariant, staggerContainerVariants, wordRevealVariant } from '@/lib/motion'

export default function PageHeroBanner({ title, subtitle, badge, breadcrumb }) {
  return (
    <section className="relative w-full h-[380px] lg:h-[480px] bg-fg-dark overflow-hidden flex flex-col justify-center px-6 lg:px-8">
      {/* Blueprint Grid Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04] z-[1]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, #fff, #fff 1px, transparent 1px, transparent 40px),
            repeating-linear-gradient(90deg, #fff, #fff 1px, transparent 1px, transparent 40px)
          `
        }}
      />

      {/* Dark Ambient Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-fg-dark via-fg-dark/95 to-fg-dark/85 z-[0]" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1300px] mx-auto flex flex-col items-center text-center">
        {/* Breadcrumb - Top Left (floating style) */}
        {breadcrumb && (
          <div className="absolute top-[-80px] lg:top-[-120px] left-0 font-mono text-[10px] sm:text-xs text-fg-muted uppercase tracking-widest">
            {breadcrumb}
          </div>
        )}

        {/* Small Pill Badge */}
        {badge && (
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 font-mono text-xs bg-fg-blue/15 text-fg-blue px-3.5 py-1.5 rounded-full mb-6 border border-fg-blue/20"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-fg-blue" />
            {badge}
          </motion.span>
        )}

        {/* Heading with word-mask reveal */}
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={staggerContainerVariants}
          className="font-display text-4xl sm:text-5xl lg:text-7xl text-fg-cream leading-tight tracking-tight max-w-4xl"
        >
          {title.split(' ').map((word, i) => (
            <span key={i} className="overflow-hidden inline-block mr-3">
              <motion.span
                className="inline-block"
                variants={wordRevealVariant}
                custom={i}
                transition={{ delay: i * 0.08 }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-fg-cream-muted font-sans text-base lg:text-lg mt-6 max-w-2xl leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* Bottom Edge Gradient Bleed into Body */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-10"
        style={{
          backgroundImage: 'linear-gradient(to bottom, transparent 0%, var(--bg-cream) 100%)'
        }}
      />
    </section>
  )
}
