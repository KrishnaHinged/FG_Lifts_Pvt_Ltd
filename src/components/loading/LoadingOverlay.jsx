'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Spinner from '@/components/ui/Spinner'

export function LoadingOverlay({
  isOpen,
  message = 'Processing secure request...'
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#EDE8E2]/85 backdrop-blur-md"
        >
          <Spinner size="lg" color="primary" />
          {message && (
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#111111] mt-6"
            >
              {message}
            </motion.span>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingOverlay
