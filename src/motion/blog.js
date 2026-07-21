import easing from './easing'

export const blogPostEntrance = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.8, ease: easing.luxury }
}

export default {
  blogPostEntrance
}
