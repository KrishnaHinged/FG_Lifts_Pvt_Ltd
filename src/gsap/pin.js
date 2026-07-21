import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

export function pinSection(triggerElement, pinElement, duration = '100%') {
  if (typeof window === 'undefined') return null

  return ScrollTrigger.create({
    trigger: triggerElement,
    pin: pinElement,
    start: 'top top',
    end: () => `+=${duration}`,
    pinSpacing: true
  })
}

export default pinSection
