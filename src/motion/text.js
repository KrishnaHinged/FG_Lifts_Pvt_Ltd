import easing from './easing'

export const wordReveal = {
  initial: { y: '100%' },
  animate: { y: '0%' },
  transition: { duration: 0.65, ease: easing.wordReveal }
}

export const wordRevealVariant = {
  hidden: { y: '100%' },
  visible: {
    y: '0%',
    transition: { duration: 0.65, ease: easing.wordReveal }
  }
}

export default {
  wordReveal,
  wordRevealVariant
}
