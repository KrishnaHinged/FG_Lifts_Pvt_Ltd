import easing from './easing'

export const rotateIn = {
  initial: { opacity: 0, rotate: -5 },
  whileInView: { opacity: 1, rotate: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease: easing.luxury }
}

export default {
  rotateIn
}
