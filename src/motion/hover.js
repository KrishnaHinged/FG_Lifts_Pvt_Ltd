import easing from './easing'

export const hoverScale = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.3, ease: easing.luxury }
}

export const hoverMagnetic = {
  whileHover: { y: -5, x: 2 },
  transition: { type: 'spring', stiffness: 300, damping: 15 }
}

export default {
  hoverScale,
  hoverMagnetic
}
