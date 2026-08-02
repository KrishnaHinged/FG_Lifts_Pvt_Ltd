'use client'

import React, { createContext, useContext, useState } from 'react'
import { useViewport } from './ViewportProvider'

const AnimationContext = createContext(null)

export function AnimationProvider({ children }) {
  const { prefersReducedMotion } = useViewport()
  const [animationsEnabled, setAnimationsEnabled] = useState(true)
  const [speedMultiplier, setSpeedMultiplier] = useState(1.0) // 0.5 for slow motion, 2.0 for fast, etc.

  React.useEffect(() => {
    setTimeout(() => {
      setAnimationsEnabled(!prefersReducedMotion)
    }, 0)
  }, [prefersReducedMotion])

  const toggleAnimations = () => {
    setAnimationsEnabled(prev => !prev)
  }

  const duration = (baseSeconds) => {
    if (!animationsEnabled) return 0
    return baseSeconds * speedMultiplier
  }

  const easings = {
    luxury: [0.16, 1, 0.3, 1], // Custom premium ease-out
    smooth: [0.25, 0.1, 0.25, 1],
    springy: { type: 'spring', damping: 25, stiffness: 350 }
  }

  return (
    <AnimationContext.Provider
      value={{
        animationsEnabled,
        setAnimationsEnabled,
        toggleAnimations,
        speedMultiplier,
        setSpeedMultiplier,
        duration,
        easings
      }}
    >
      {children}
    </AnimationContext.Provider>
  )
}

export function useAnimation() {
  const context = useContext(AnimationContext)
  if (!context) {
    throw new Error('useAnimation must be used within an AnimationProvider')
  }
  return context
}

export default AnimationProvider
