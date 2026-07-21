/**
 * Window scroll animation utilities.
 */

export function scrollToElement(elementId, offset = 0) {
  if (typeof window === 'undefined') return
  const element = document.getElementById(elementId)
  if (element) {
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

export function scrollToTop() {
  if (typeof window === 'undefined') return
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

export function getScrollProgress() {
  if (typeof window === 'undefined') return 0
  const h = document.documentElement
  const b = document.body
  const st = 'scrollTop'
  const sh = 'scrollHeight'
  return (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)
}

export default {
  scrollToElement,
  scrollToTop,
  getScrollProgress
}
