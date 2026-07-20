// Reusable Framer Motion animation presets
// Used consistently across all scroll-triggered sections

export const fadeUp = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }
}

export const fadeUpChild = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
}

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

export const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  }
}

// Word-by-word mask reveal
export const wordReveal = {
  initial: { y: '100%' },
  animate: { y: '0%' },
  transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] }
}

export const wordRevealVariant = {
  hidden: { y: '100%' },
  visible: {
    y: '0%',
    transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] }
  }
}

// Slide from left
export const slideLeft = {
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
}

// Slide from right
export const slideRight = {
  initial: { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
}

// Scale reveal
export const scaleUp = {
  initial: { opacity: 0, scale: 0.95 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }
}

export const scaleIn = {
  initial: { opacity: 0, scale: 1.04 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
}

export const slideFromLeft = {
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }
}

export const slideFromRight = {
  initial: { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }
}

