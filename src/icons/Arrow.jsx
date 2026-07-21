import React from 'react'

export function Arrow({
  size = 20,
  color = 'currentColor',
  strokeWidth = 2,
  className = '',
  'aria-label': ariaLabel,
  direction = 'right', // right | left | up | down
  ...props
}) {
  const rotation = {
    right: '',
    left: 'rotate-180',
    up: '-rotate-90',
    down: 'rotate-90'
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
      aria-label={ariaLabel || 'Arrow'}
      role={ariaLabel ? 'img' : undefined}
      {...props}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

export default Arrow
