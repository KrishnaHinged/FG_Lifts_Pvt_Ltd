import easing from './easing'

export const drawerRight = {
  initial: { x: '100%' },
  animate: { x: 0 },
  exit: { x: '100%' },
  transition: { duration: 0.5, ease: easing.luxury }
}

export const drawerLeft = {
  initial: { x: '-100%' },
  animate: { x: 0 },
  exit: { x: '-100%' },
  transition: { duration: 0.5, ease: easing.luxury }
}

export default {
  drawerRight,
  drawerLeft
}
