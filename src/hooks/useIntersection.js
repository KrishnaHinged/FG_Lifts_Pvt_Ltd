'use client'

import { useState, useEffect, useRef } from 'react'

export function useIntersection({ root = null, rootMargin = '0px', threshold = 0.1, triggerOnce = true } = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const targetRef = useRef(null)

  useEffect(() => {
    const element = targetRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true)
          if (triggerOnce) {
            observer.unobserve(element)
          }
        } else if (!triggerOnce) {
          setIsIntersecting(false)
        }
      },
      { root, rootMargin, threshold }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [root, rootMargin, threshold, triggerOnce])

  return [targetRef, isIntersecting]
}

export default useIntersection
