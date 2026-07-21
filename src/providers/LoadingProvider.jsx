'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Spinner from '@/components/ui/Spinner'

const LoadingContext = createContext(null)

export function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const startLoading = () => setLoading(true)
  const stopLoading = () => setLoading(false)

  // Auto-stop loading overlay on route complete
  useEffect(() => {
    stopLoading()
  }, [pathname, searchParams])

  return (
    <LoadingContext.Provider value={{ loading, startLoading, stopLoading }}>
      {children}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#EDE8E2]/85 backdrop-blur-md"
          >
            <Spinner size="lg" color="primary" />
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#111111] mt-6"
            >
              System Transitioning...
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </LoadingContext.Provider>
  )
}

export function useLoading() {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}

export default LoadingProvider
