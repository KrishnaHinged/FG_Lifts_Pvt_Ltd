export const animation = {
  timing: {
    duration: {
      fast: 0.3,
      normal: 0.6,
      slow: 1.2
    },
    delay: {
      stagger: 0.05,
      staggerList: 0.08
    }
  },
  easing: {
    standard: [0.16, 1, 0.3, 1], // easeOutExpo
    bounce: 'easeIn-out',
    out: 'easeOut'
  },
  spring: {
    damping: 25,
    stiffness: 200,
    mass: 0.5
  },
  springRotate: {
    damping: 20,
    stiffness: 150,
    mass: 0.3
  }
}

export default animation
