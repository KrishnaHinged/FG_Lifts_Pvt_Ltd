'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PHASES = {
  INIT: 0,
  RAILS: 1,
  DOORS_CLOSE: 2,
  SEAL: 3,
  DOORS_OPEN: 4,
}

const statusMap = {
  [PHASES.INIT]: { label: 'Initialising...', pct: 10 },
  [PHASES.RAILS]: { label: 'Assembling cabin...', pct: 40 },
  [PHASES.DOORS_CLOSE]: { label: 'Engaging lock...', pct: 70 },
  [PHASES.SEAL]: { label: 'Checking systems...', pct: 90 },
  [PHASES.DOORS_OPEN]: { label: 'System ready', pct: 100 },
}

export default function ElevatorLoader({
  onComplete,
  mode = 'full', // 'full' (~3s) | 'compact' (~1.5s)
  theme = 'light', // 'light' | 'dark'
  className = '',
}) {
  const [phase, setPhase] = useState(PHASES.INIT)
  const compact = mode === 'compact'
  const isDark = theme === 'dark'
  const t = compact ? 0.5 : 1

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(PHASES.RAILS), 350 * t),
      setTimeout(() => setPhase(PHASES.DOORS_CLOSE), 800 * t),
      setTimeout(() => setPhase(PHASES.SEAL), 1400 * t),
      setTimeout(() => setPhase(PHASES.DOORS_OPEN), 1800 * t),
      setTimeout(() => onComplete?.(), 2400 * t),
    ]
    return () => timers.forEach(clearTimeout)
  }, [compact, t, onComplete])

  const { label, pct } = statusMap[phase]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center select-none overflow-hidden ${
        isDark ? 'bg-[#040C1A]' : 'bg-[#FAF9F7]'
      } ${className}`}
    >
      {/* Background ambient glowing blobs */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: '8%', left: '10%',
          width: 340, height: 340,
          borderRadius: '50%',
          background: isDark ? 'rgba(14,79,179,0.25)' : 'rgba(134,210,110,0.22)',
          filter: 'blur(70px)',
        }}
        animate={{ x: [0, 30, -20, 0], y: [0, -20, 15, 0], scale: [1, 1.08, 0.95, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: '45%', right: '8%',
          width: 300, height: 300,
          borderRadius: '50%',
          background: isDark ? 'rgba(0,116,217,0.20)' : 'rgba(255,150,60,0.20)',
          filter: 'blur(60px)',
        }}
        animate={{ x: [0, -25, 20, 0], y: [0, 20, -18, 0], scale: [1, 0.92, 1.06, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute pointer-events-none"
        style={{
          bottom: '6%', left: '30%',
          width: 320, height: 320,
          borderRadius: '50%',
          background: isDark ? 'rgba(197,160,89,0.15)' : 'rgba(240,100,160,0.18)',
          filter: 'blur(65px)',
        }}
        animate={{ x: [0, 18, -15, 0], y: [0, 25, -20, 0], scale: [1, 1.05, 0.96, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Brand label */}
        <p className={`text-[10px] font-semibold tracking-[0.25em] uppercase ${isDark ? 'text-[#94A3B8]' : 'text-[#888]'}`}>
          FG LIFTS · SURAT
        </p>

        {/* Elevator card */}
        <div
          className="relative"
          style={{ width: 220, height: 300 }}
        >
          {/* Left guide rail */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: phase >= PHASES.RAILS ? 1 : 0 }}
            transition={{ duration: 0.6 * t, ease: [0.34, 1.56, 0.64, 1] }}
            className="absolute top-0 bottom-0 left-4"
            style={{
              width: 2,
              borderRadius: 2,
              background: isDark
                ? 'linear-gradient(to bottom, transparent, #0E4FB3 30%, #0E4FB3 70%, transparent)'
                : 'linear-gradient(to bottom, transparent, #bbb 30%, #bbb 70%, transparent)',
              transformOrigin: 'top',
            }}
          />

          {/* Right guide rail */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: phase >= PHASES.RAILS ? 1 : 0 }}
            transition={{ duration: 0.6 * t, delay: 0.08, ease: [0.34, 1.56, 0.64, 1] }}
            className="absolute top-0 bottom-0 right-4"
            style={{
              width: 2,
              borderRadius: 2,
              background: isDark
                ? 'linear-gradient(to bottom, transparent, #0E4FB3 30%, #0E4FB3 70%, transparent)'
                : 'linear-gradient(to bottom, transparent, #bbb 30%, #bbb 70%, transparent)',
              transformOrigin: 'top',
            }}
          />

          {/* Cabin shell */}
          <div
            className="absolute inset-x-8 inset-y-0 overflow-hidden"
            style={{
              borderRadius: 16,
              border: isDark ? '1.5px solid #1E3A8A' : '1.5px solid #1a1a1a',
              background: isDark ? '#0A1628' : '#f0ede8',
            }}
          >
            {/* SVG cabin outline draw-on */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
              viewBox="0 0 204 300"
            >
              <motion.rect
                x="2" y="2" width="200" height="296" rx="14"
                fill="none"
                stroke={isDark ? '#0E4FB3' : '#1a1a1a'}
                strokeWidth="1.5"
                strokeDasharray="1000"
                initial={{ strokeDashoffset: 1000 }}
                animate={{ strokeDashoffset: phase >= PHASES.RAILS ? 0 : 1000 }}
                transition={{ duration: 1.1 * t, ease: [0.65, 0, 0.35, 1] }}
              />
            </svg>

            {/* Left door panel */}
            <motion.div
              className="absolute top-0 left-0 h-full overflow-hidden"
              style={{
                width: '50%',
                background: isDark
                  ? 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)'
                  : 'linear-gradient(135deg, #e8e4de 0%, #ddd8d0 100%)',
                borderRight: isDark ? '1px solid #334155' : '1px solid #c8c2ba',
                zIndex: 3,
              }}
              initial={{ x: '-100%' }}
              animate={{
                x: phase === PHASES.DOORS_CLOSE || phase === PHASES.SEAL
                  ? '0%'
                  : '-100%',
              }}
              transition={{ duration: 0.7 * t, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <DoorPanel side="left" isDark={isDark} />
            </motion.div>

            {/* Right door panel */}
            <motion.div
              className="absolute top-0 right-0 h-full overflow-hidden"
              style={{
                width: '50%',
                background: isDark
                  ? 'linear-gradient(225deg, #1E293B 0%, #0F172A 100%)'
                  : 'linear-gradient(225deg, #e8e4de 0%, #ddd8d0 100%)',
                borderLeft: isDark ? '1px solid #334155' : '1px solid #c8c2ba',
                zIndex: 3,
              }}
              initial={{ x: '100%' }}
              animate={{
                x: phase === PHASES.DOORS_CLOSE || phase === PHASES.SEAL
                  ? '0%'
                  : '100%',
              }}
              transition={{ duration: 0.7 * t, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <DoorPanel side="right" isDark={isDark} />
            </motion.div>

            {/* Centre seam glow when sealed */}
            <AnimatePresence>
              {phase === PHASES.SEAL && (
                <motion.div
                  key="seam"
                  className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 z-20"
                  style={{ width: 2, background: isDark ? '#0E4FB3' : '#1a1a1a', borderRadius: 2 }}
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: [0, 1, 0], scaleY: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 * t, ease: 'easeInOut' }}
                />
              )}
            </AnimatePresence>

            {/* Interior content (visible when doors open) */}
            <div className="absolute inset-0 z-1 flex flex-col items-center justify-center gap-2 p-4">
              <motion.div
                animate={{ y: phase >= PHASES.DOORS_OPEN ? [0, -4, 0] : 0 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: isDark ? '#0E4FB3' : '#1a1a1a' }}
              >
                {/* Up arrows icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="18 15 12 9 6 15" />
                  <polyline points="18 20 12 14 6 20" />
                </svg>
              </motion.div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: phase >= PHASES.DOORS_OPEN ? 1 : 0 }}
                transition={{ delay: 0.25 * t }}
                className="text-[11px] font-semibold tracking-widest uppercase"
                style={{ color: isDark ? '#FFFFFF' : '#1a1a1a' }}
              >
                FG Lifts
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: phase >= PHASES.DOORS_OPEN ? 1 : 0 }}
                transition={{ delay: 0.4 * t }}
                className="text-[9px] tracking-widest uppercase"
                style={{ color: isDark ? '#94A3B8' : '#888' }}
              >
                Ready
              </motion.span>
            </div>
          </div>

          {/* Floor plate */}
          <div
            className="absolute bottom-0 left-6 right-6"
            style={{ height: 4, background: isDark ? '#1E3A8A' : '#e0d8d0', borderRadius: 2 }}
          />
        </div>

        {/* Progress bar */}
        <div className="flex flex-col items-center gap-2" style={{ width: 220 }}>
          <div
            className="w-full overflow-hidden"
            style={{ height: 3, background: isDark ? '#1E293B' : '#e0d8d0', borderRadius: 99 }}
          >
            <motion.div
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              style={{ height: '100%', background: isDark ? '#0E4FB3' : '#1a1a1a', borderRadius: 99 }}
            />
          </div>
          <div className="flex justify-between w-full">
            <span
              className="text-[10px] font-medium tracking-[0.12em] uppercase"
              style={{ color: isDark ? '#94A3B8' : '#888' }}
            >
              {label}
            </span>
            <span
              className="text-[10px] font-semibold"
              style={{ color: isDark ? '#FFFFFF' : '#1a1a1a' }}
            >
              {pct}%
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/** Decorative door panel interior */
function DoorPanel({ side, isDark }) {
  const lineBg = isDark ? '#334155' : '#c0b8b0'
  const panelBg = isDark ? 'rgba(30, 41, 59, 0.4)' : 'rgba(255,255,255,0.3)'

  return (
    <div className="relative w-full h-full">
      {/* Horizontal accent lines */}
      <div
        className="absolute"
        style={{
          top: 24,
          left: side === 'left' ? 10 : 6,
          right: side === 'left' ? 6 : 10,
          height: 1,
          background: lineBg,
          opacity: 0.8,
        }}
      />
      {/* Upper recessed panel */}
      <div
        className="absolute"
        style={{
          top: 36,
          left: side === 'left' ? 10 : 6,
          right: side === 'left' ? 6 : 10,
          height: 70,
          border: `1px solid ${lineBg}`,
          borderRadius: 4,
          background: panelBg,
        }}
      />
      {/* Lower recessed panel */}
      <div
        className="absolute"
        style={{
          bottom: 36,
          left: side === 'left' ? 10 : 6,
          right: side === 'left' ? 6 : 10,
          height: 70,
          border: `1px solid ${lineBg}`,
          borderRadius: 4,
          background: panelBg,
        }}
      />
      {/* Bottom accent line */}
      <div
        className="absolute"
        style={{
          bottom: 24,
          left: side === 'left' ? 10 : 6,
          right: side === 'left' ? 6 : 10,
          height: 1,
          background: lineBg,
          opacity: 0.8,
        }}
      />
      {/* Shimmer sweep */}
      <motion.div
        initial={{ x: '-60%' }}
        animate={{ x: '160%' }}
        transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 0.8, ease: 'easeInOut' }}
        className="absolute inset-y-0 pointer-events-none"
        style={{
          width: '40%',
          background: isDark
            ? 'linear-gradient(90deg, transparent, rgba(14, 79, 179, 0.35), transparent)'
            : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)',
          transform: 'skewX(-12deg)',
        }}
      />
    </div>
  )
}