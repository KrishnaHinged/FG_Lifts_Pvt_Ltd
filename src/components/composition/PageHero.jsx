'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { staggerContainerVariants, wordRevealVariant } from '@/motion/index'

export function PageHero({
  title,
  subtitle,
  badge,
  breadcrumb,
  actions,
  className = '',
  ...props
}) {
  return (
    <section 
      className={`relative w-full h-[380px] lg:h-[480px] bg-[#111111] overflow-hidden flex flex-col justify-center px-6 lg:px-8 ${className}`}
      {...props}
    >
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
      <div className="absolute inset-0 bg-gradient-to-b from-[#111111] via-[#111111]/95 to-[#111111]/85 z-[0]" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1300px] mx-auto flex flex-col items-center text-center">
        {/* Breadcrumb */}
        {breadcrumb && (
          <div className="absolute top-[-80px] lg:top-[-120px] left-0 font-mono text-[10px] sm:text-xs text-[#7A7A7A] uppercase tracking-widest">
            {breadcrumb}
          </div>
        )}

        {/* Small Pill Badge */}
        {badge && (
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 font-mono text-xs bg-[#0E4FB3]/15 text-[#0E4FB3] px-3.5 py-1.5 rounded-full mb-6 border border-[#0E4FB3]/20"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#0E4FB3]" />
            {badge}
          </motion.span>
        )}

        {/* Heading with word-mask reveal */}
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={staggerContainerVariants}
          className="font-display text-4xl sm:text-5xl lg:text-7xl text-[#F5F0EB] leading-tight tracking-tight max-w-4xl"
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
            className="text-white/60 font-sans text-base lg:text-lg mt-6 max-w-2xl leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}

        {/* Actions Button Cluster */}
        {actions && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 flex gap-4"
          >
            {actions}
          </motion.div>
        )}
      </div>

      {/* Bottom Edge Gradient Bleed into Body */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-10"
        style={{
          backgroundImage: 'linear-gradient(to bottom, transparent 0%, #F5F0EB 100%)'
        }}
      />
    </section>
  )
}

export default PageHero
