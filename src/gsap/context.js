import gsap from 'gsap'

export function createGSAPContext(scope, fn) {
  if (typeof window === 'undefined') return null
  return gsap.context(fn, scope)
}

export default createGSAPContext
