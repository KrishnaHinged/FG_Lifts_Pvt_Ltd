'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

const ViewportContext = createContext(null)

export function ViewportProvider({ children }) {
  const [width, setWidth] = useState(1200)
  const [height, setHeight] = useState(800)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    let resizeTimer = null
    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
      }, 100)
    }

    // Measure viewport dimensions immediately on mount (client-side)
    const initialWidth = window.innerWidth
    const initialHeight = window.innerHeight
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const initialPrefersMotion = motionMediaQuery.matches

    setTimeout(() => {
      setWidth(initialWidth)
      setHeight(initialHeight)
      setIsTouchDevice(isTouch)
      setPrefersReducedMotion(initialPrefersMotion)
    }, 0)

    const handleMotionChange = (e) => {
      setPrefersReducedMotion(e.matches)
    }

    window.addEventListener('resize', handleResize, { passive: true })
    motionMediaQuery.addEventListener('change', handleMotionChange)

    return () => {
      if (resizeTimer) clearTimeout(resizeTimer)
      window.removeEventListener('resize', handleResize)
      motionMediaQuery.removeEventListener('change', handleMotionChange)
    }
  }, [])

  const value = React.useMemo(() => {
    const breakpoints = {
      sm: width >= 640,
      md: width >= 768,
      lg: width >= 1024,
      xl: width >= 1280,
      '2xl': width >= 1536
    }
    const orientation = width > height ? 'landscape' : 'portrait'

    return {
      width,
      height,
      breakpoints,
      orientation,
      isTouchDevice,
      prefersReducedMotion
    }
  }, [width, height, isTouchDevice, prefersReducedMotion])

  return (
    <ViewportContext.Provider value={value}>
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
