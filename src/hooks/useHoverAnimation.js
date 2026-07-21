'use client'

import { useState } from 'react'

export function useHoverAnimation() {
  const [isHovered, setIsHovered] = useState(false)

  const bindHover = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false)
  }

  return [isHovered, bindHover]
}

export default useHoverAnimation
