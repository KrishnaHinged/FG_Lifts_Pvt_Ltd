export const cursorFollower = (mousePosition) => {
  if (!mousePosition) return {}
  return {
    animate: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24
    },
    transition: {
      type: 'spring',
      mass: 0.1,
      stiffness: 1000,
      damping: 50
    }
  }
}

export default {
  cursorFollower
}
