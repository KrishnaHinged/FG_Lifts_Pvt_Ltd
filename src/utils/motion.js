/**
 * Dynamic Framer Motion helper builders.
 */

export function createFadeUp(duration = 0.6, delay = 0) {
  return {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration, delay, ease: [0.16, 1, 0.3, 1] }
  }
}

export function createStagger(staggerChildren = 0.08, delayChildren = 0) {
  return {
    initial: {},
    animate: {
      transition: { staggerChildren, delayChildren }
    }
  }
}

export function createFadeIn(duration = 0.5, delay = 0) {
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration, delay, ease: 'linear' }
  }
}

export default {
  createFadeUp,
  createStagger,
  createFadeIn
}
