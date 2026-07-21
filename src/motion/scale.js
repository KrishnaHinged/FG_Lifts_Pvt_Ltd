import easing from './easing'

export const scaleUp = {
  initial: { opacity: 0, scale: 0.95 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: easing.luxury }
}

export const scaleIn = {
  initial: { opacity: 0, scale: 1.04 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease: easing.luxury }
}

export default {
  scaleUp,
  scaleIn
}
