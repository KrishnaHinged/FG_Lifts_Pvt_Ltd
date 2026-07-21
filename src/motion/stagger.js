export const staggerContainer = {
  initial: {},
  whileInView: {
    transition: { staggerChildren: 0.08 }
  },
  viewport: { once: true, amount: 0.2 }
}

export const staggerContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 }
  }
}

export const staggerChild = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
}

export default {
  staggerContainer,
  staggerContainerVariants,
  staggerChild
}
