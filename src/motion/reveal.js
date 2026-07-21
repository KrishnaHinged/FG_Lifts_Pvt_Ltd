import easing from './easing'

export const blurReveal = {
  initial: { opacity: 0, filter: 'blur(10px)' },
  whileInView: { opacity: 1, filter: 'blur(0px)' },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease: easing.luxury }
}

export const imageReveal = {
  initial: { scale: 1.15, clipPath: 'inset(100% 0% 0% 0%)' },
  whileInView: { scale: 1.0, clipPath: 'inset(0% 0% 0% 0%)' },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 1.2, ease: easing.luxury }
}

export default {
  blurReveal,
  imageReveal
}
