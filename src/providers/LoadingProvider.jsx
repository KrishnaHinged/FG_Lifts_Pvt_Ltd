'use client'

import React, { createContext, useContext, useState, useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { AnimatePresence } from 'framer-motion'
import LuxuryElevatorLoader from '@/components/loading/LuxuryElevatorLoader'

const LoadingContext = createContext(null)

export function LoadingProvider({ children }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const prevPathRef = useRef(pathname)

  const isAdmin = pathname?.startsWith('/admin')

  // Show loader on initial page load for non-admin pages
  const [loading, setLoading] = useState(() => {
    if (typeof window === 'undefined' || isAdmin) return false
    // On home page, if intro hasn't played yet, let IntroAnimation run first
    if (pathname === '/' && sessionStorage.getItem('fg_intro_played') !== 'true') {
      return false
    }
    return true
  })

  const startLoading = () => setLoading(true)
  const stopLoading = () => setLoading(false)

  // Listen to pathname changes
  useEffect(() => {
    if (isAdmin) {
      stopLoading()
      return
    }

    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname
      setLoading(true)
    }
  }, [pathname, isAdmin])

  // Click interceptor for standard links to trigger loader during navigation
  useEffect(() => {
    if (isAdmin) return

    const handleAnchorClick = (e) => {
      const target = e.currentTarget
      const href = target.getAttribute('href')
      if (
        href &&
        href.startsWith('/') &&
        !href.startsWith('/#') &&
        href !== window.location.pathname
      ) {
        setLoading(true)
      }
    }

    const anchors = document.querySelectorAll('a[href^="/"]')
    anchors.forEach(a => a.addEventListener('click', handleAnchorClick))

    return () => {
      anchors.forEach(a => a.removeEventListener('click', handleAnchorClick))
    }
  }, [pathname, isAdmin])

  return (
    <LoadingContext.Provider value={{ loading, startLoading, stopLoading }}>
      {children}
      <AnimatePresence>
        {loading && (
          <LuxuryElevatorLoader
            mode={pathname === '/' ? 'full' : 'compact'}
            onComplete={stopLoading}
          />
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
