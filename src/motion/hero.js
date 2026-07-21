import easing from './easing'

export const heroEntrance = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.2, ease: easing.luxury }
}

export default {
  heroEntrance
}
