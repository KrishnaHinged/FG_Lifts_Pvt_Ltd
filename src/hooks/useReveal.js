'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

export function useReveal(direction = 'up', delay = 0, duration = 0.8) {
  const ref = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    const el = ref.current
    if (!el) return

    const offsetMap = {
      up: { y: 40 },
      down: { y: -40 },
      left: { x: 40 },
      right: { x: -40 }
    }

    const offset = offsetMap[direction] || offsetMap.up

    const anim = gsap.fromTo(el, 
      { opacity: 0, ...offset },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration,
        delay,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    )

    return () => {
      anim.kill()
    }
  }, [direction, delay, duration])

  return ref
}

export default useReveal
