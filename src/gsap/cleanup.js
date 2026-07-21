import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

export function cleanupGSAP(ctx) {
  if (ctx) {
    ctx.revert()
  }
  // Safe general ScrollTrigger refresh
  if (typeof window !== 'undefined') {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  }
}

export default cleanupGSAP
