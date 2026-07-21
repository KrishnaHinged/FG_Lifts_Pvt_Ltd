export const marqueeLoop = (duration = 20) => ({
  animate: {
    x: [0, -1035]
  },
  transition: {
    x: {
      repeat: Infinity,
      repeatType: 'loop',
      duration,
      ease: 'linear'
    }
  }
})

export default {
  marqueeLoop
}
