'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

const ScrollContext = createContext(null)

export function ScrollProvider({ children }) {
  const [scrollY, setScrollY] = useState(0)
  const [scrollDirection, setScrollDirection] = useState('none') // up | down | none
  const [isAtTop, setIsAtTop] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return

    let lastScrollVal = window.scrollY

    const handleScroll = () => {
      const currentScrollVal = window.scrollY
      setScrollY(currentScrollVal)
      setIsAtTop(currentScrollVal < 10)

      if (currentScrollVal > lastScrollVal) {
        setScrollDirection('down')
      } else if (currentScrollVal < lastScrollVal) {
        setScrollDirection('up')
      }
      lastScrollVal = currentScrollVal
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
