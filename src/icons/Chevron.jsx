import React from 'react'

export function Chevron({
  size = 20,
  color = 'currentColor',
  strokeWidth = 2,
  className = '',
  'aria-label': ariaLabel,
  direction = 'down', // down | up | left | right
  ...props
}) {
  const rotation = {
    down: '',
    up: 'rotate-180',
    left: 'rotate-90',
    right: '-rotate-90'
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${rotation[direction]} ${className}`}
      aria-label={ariaLabel || 'Chevron'}
      role={ariaLabel ? 'img' : undefined}
      {...props}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

export default Chevron
