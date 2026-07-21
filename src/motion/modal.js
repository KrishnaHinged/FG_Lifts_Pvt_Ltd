import easing from './easing'

export const modalBackdrop = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
}

export const modalContent = {
  initial: { opacity: 0, scale: 0.95, y: 15 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: 15 },
  transition: { type: 'spring', damping: 25, stiffness: 350 }
}

export default {
  modalBackdrop,
  modalContent
}
