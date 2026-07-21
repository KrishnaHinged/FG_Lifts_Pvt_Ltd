import easing from './easing'

export const galleryItem = {
  initial: { opacity: 0, scale: 0.95 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7, ease: easing.luxury }
}

export default {
  galleryItem
}
