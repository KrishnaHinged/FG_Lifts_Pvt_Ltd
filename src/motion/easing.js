export const easing = {
  luxury: [0.16, 1, 0.3, 1], // easeOutExpo
  smooth: [0.25, 0.1, 0.25, 1], // easeInOutQuad
  snappy: [0.33, 1, 0.68, 1], // easeOutCubic
  wordReveal: [0.76, 0, 0.24, 1],
  standard: [0.4, 0, 0.2, 1],
  spring: { type: 'spring', damping: 25, stiffness: 200 }
}

export default easing
