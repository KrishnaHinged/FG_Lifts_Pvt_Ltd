'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import Lenis from 'lenis'

const LenisContext = createContext(null)

export function LenisProvider({ children }) {
  const [lenis, setLenis] = useState(null)

  useEffect(() => {
    const lenisInstance = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.8,
    })

    setLenis(lenisInstance)

    if (typeof window !== 'undefined') {
      window.lenis = lenisInstance
    }

    let raf
    function loop(time) {
      lenisInstance.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenisInstance.destroy()
      if (typeof window !== 'undefined') {
        window.lenis = undefined
      }
    }
  }, [])

  const scrollTo = (target, options = {}) => {
    if (lenis) lenis.scrollTo(target, options)
  }

  const stop = () => {
    if (lenis) lenis.stop()
  }

  const start = () => {
    if (lenis) lenis.start()
  }

  return (
    <LenisContext.Provider value={{ lenis, scrollTo, stop, start }}>
      {children}
    </LenisContext.Provider>
  )
}

export function useLenis() {
  const context = useContext(LenisContext)
  if (!context) {
    throw new Error('useLenis must be used within a LenisProvider')
  }
  return context
}

export default LenisProvider
