import easing from './easing'

export const productCard = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: easing.luxury }
}

export default {
  productCard
}
