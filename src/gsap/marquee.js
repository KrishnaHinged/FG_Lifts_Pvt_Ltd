import gsap from 'gsap'

export function createGSAPMarquee(targetElement, duration = 20, direction = 'left') {
  if (typeof window === 'undefined') return null

  const xVal = direction === 'left' ? '-50%' : '50%'
  const startVal = direction === 'left' ? '0%' : '-50%'

  gsap.set(targetElement, { x: startVal })

  return gsap.to(targetElement, {
    x: xVal,
    duration,
    ease: 'none',
    repeat: -1
  })
}

export default createGSAPMarquee
