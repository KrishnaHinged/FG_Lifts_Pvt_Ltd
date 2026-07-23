'use client'

import { useState } from 'react'
import { useIntersection } from './useIntersection'

export function useLazyLoad(options = {}) {
  const [targetRef, isIntersecting] = useIntersection(options)
  const [hasLoaded, setHasLoaded] = useState(false)

  if (isIntersecting && !hasLoaded) {
    setHasLoaded(true)
  }

  return { targetRef, shouldRender: isIntersecting || hasLoaded }
}

export default useLazyLoad
