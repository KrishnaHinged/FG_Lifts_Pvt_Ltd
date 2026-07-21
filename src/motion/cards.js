import easing from './easing'

export const cardReveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: easing.luxury }
}

export const cardZoomHover = {
  initial: { scale: 1 },
  whileHover: { scale: 1.03 },
  transition: { duration: 0.4, ease: easing.luxury }
}

export default {
  cardReveal,
  cardZoomHover
}
