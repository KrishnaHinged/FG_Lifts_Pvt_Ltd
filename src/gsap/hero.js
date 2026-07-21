import gsap from 'gsap'

export function playHeroEntrance(titleElement, subtitleElement, badgeElement, ctaElement) {
  if (typeof window === 'undefined') return null

  const tl = gsap.timeline()
  
  if (badgeElement) {
    tl.fromTo(badgeElement, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power4.out' })
  }
  if (titleElement) {
    tl.fromTo(titleElement, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power4.out' }, '-=0.4')
  }
  if (subtitleElement) {
    tl.fromTo(subtitleElement, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
  }
  if (ctaElement) {
    tl.fromTo(ctaElement, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
  }

  return tl
}

export default playHeroEntrance
