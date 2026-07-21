import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

export function createHorizontalScroll(triggerElement, targetElement, scrollAmount = '100%') {
  if (typeof window === 'undefined') return null

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      pin: true,
      scrub: 1,
      start: 'top top',
      end: () => `+=${triggerElement.offsetWidth}`,
      invalidateOnRefresh: true
    }
  })

  tl.to(targetElement, {
    x: `-${scrollAmount}`,
    ease: 'none'
  })

  return tl
}

export default createHorizontalScroll
