import gsap from 'gsap'

export function createTimeline(vars = {}) {
  return gsap.timeline(vars)
}

export default createTimeline
