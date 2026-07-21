import easing from './easing'

export const pageEnter = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 15 },
  transition: { duration: 0.5, ease: easing.luxury }
}

export default {
  pageEnter
}
