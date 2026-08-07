'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import Lenis from 'lenis'

import { usePathname } from 'next/navigation'

const LenisContext = createContext(null)

export function LenisProvider({ children }) {
  const [lenis, setLenis] = useState(null)
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  useEffect(() => {
    if (isAdmin) return

    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    const lenisInstance = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.8,
      smoothTouch: false,
      syncTouch: false,
      touchMultiplier: 1.5,
    })

    setTimeout(() => {
      setLenis(lenisInstance)
    }, 0)

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
  }, [isAdmin])

  // Reset scroll to top on route change, or scroll to target element if hash exists
  useEffect(() => {
    if (isAdmin || typeof window === 'undefined') return

    const getHash = () => {
      if (window.location.hash && window.location.hash.length > 1) {
        return window.location.hash
      }
      const hrefParts = window.location.href.split('#')
      if (hrefParts.length > 1 && hrefParts[1]) {
        return '#' + hrefParts[1]
      }
      return ''
    }

    const hash = getHash()

    if (hash && hash.length > 1) {
      let attempts = 0
      const maxAttempts = 30

      const checkAndScroll = () => {
        const targetEl = document.querySelector(hash)
        if (targetEl) {
          if (lenis && typeof lenis.scrollTo === 'function') {
            lenis.scrollTo(targetEl, { offset: -60, duration: 1.0 })
          } else {
            targetEl.scrollIntoView({ behavior: 'smooth' })
          }
        } else if (attempts < maxAttempts) {
          attempts++
          setTimeout(checkAndScroll, 60)
        }
      }

      // Delay slightly to let page components mount before scrolling
      const timer = setTimeout(checkAndScroll, 80)
      return () => clearTimeout(timer)
    }

    // Only reset to top when NO hash target exists in URL
    const resetScroll = () => {
      window.scrollTo(0, 0)
      if (lenis && typeof lenis.scrollTo === 'function') {
        lenis.scrollTo(0, { immediate: true })
      }
    }

    resetScroll()

    const timer1 = setTimeout(resetScroll, 50)
    const timer2 = setTimeout(resetScroll, 150)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [pathname, lenis, isAdmin])

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
