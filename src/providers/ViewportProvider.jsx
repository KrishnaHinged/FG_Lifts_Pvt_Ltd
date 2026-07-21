'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

const ViewportContext = createContext(null)

export function ViewportProvider({ children }) {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
  const [height, setHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 800)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleResize = () => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }

    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)

    const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(motionMediaQuery.matches)

    const handleMotionChange = (e) => {
      setPrefersReducedMotion(e.matches)
    }

    window.addEventListener('resize', handleResize, { passive: true })
    motionMediaQuery.addEventListener('change', handleMotionChange)

    return () => {
      window.removeEventListener('resize', handleResize)
      motionMediaQuery.removeEventListener('change', handleMotionChange)
    }
  }, [])

  const breakpoints = {
    sm: width >= 640,
    md: width >= 768,
    lg: width >= 1024,
    xl: width >= 1280,
    '2xl': width >= 1536
  }

  const orientation = width > height ? 'landscape' : 'portrait'

  return (
    <ViewportContext.Provider
      value={{
        width,
        height,
        breakpoints,
        orientation,
        isTouchDevice,
        prefersReducedMotion
      }}
    >
      {children}
    </ViewportContext.Provider>
  )
}

export function useViewport() {
  const context = useContext(ViewportContext)
  if (!context) {
    throw new Error('useViewport must be used within a ViewportProvider')
  }
  return context
}

export default ViewportProvider
