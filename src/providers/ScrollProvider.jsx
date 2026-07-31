'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

const ScrollContext = createContext(null)

export function ScrollProvider({ children }) {
  const [scrollY, setScrollY] = useState(0)
  const [scrollDirection, setScrollDirection] = useState('none') // up | down | none
  const [isAtTop, setIsAtTop] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.location.pathname.startsWith('/admin')) return

    let lastScrollVal = window.scrollY
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollVal = window.scrollY
          
          // Only update isAtTop state when status actually changes
          const nextIsAtTop = currentScrollVal < 10
          setIsAtTop(prev => prev !== nextIsAtTop ? nextIsAtTop : prev)

          // Only update scrollDirection when direction changes
          if (currentScrollVal > lastScrollVal + 5) {
            setScrollDirection(prev => prev !== 'down' ? 'down' : prev)
            lastScrollVal = currentScrollVal
          } else if (currentScrollVal < lastScrollVal - 5) {
            setScrollDirection(prev => prev !== 'up' ? 'up' : prev)
            lastScrollVal = currentScrollVal
          }

          setScrollY(currentScrollVal)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <ScrollContext.Provider value={{ scrollY, scrollDirection, isAtTop }}>
      {children}
    </ScrollContext.Provider>
  )
}

export function useScroll() {
  const context = useContext(ScrollContext)
  if (!context) {
    throw new Error('useScroll must be used within a ScrollProvider')
  }
  return context
}

export default ScrollProvider
