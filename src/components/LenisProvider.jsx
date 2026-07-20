'use client'
import { useEffect } from 'react'
import Lenis from 'lenis'

export default function LenisProvider({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.8,
    })
    
    if (typeof window !== 'undefined') {
      window.lenis = lenis
    }

    let raf
    function loop(time) {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      if (typeof window !== 'undefined') {
        window.lenis = undefined
      }
    }
  }, [])

  return <>{children}</>
}
