import gsap from 'gsap'

export function createParallax(targetElement, speed = 0.5, triggerElement = null) {
  if (typeof window === 'undefined') return null

  return gsap.to(targetElement, {
    yPercent: -20 * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: triggerElement || targetElement,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  })
}

export default createParallax
