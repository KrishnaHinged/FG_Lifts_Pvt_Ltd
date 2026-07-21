import React from 'react'

export function Elevator({
  size = 20,
  color = 'currentColor',
  strokeWidth = 2,
  className = '',
  'aria-label': ariaLabel,
  ...props
}) {
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
      className={className}
      aria-label={ariaLabel || 'Elevator'}
      role={ariaLabel ? 'img' : undefined}
      {...props}
    >
      {/* Elevator Outer Frame & Cabin representation */}
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="9" y1="3" x2="9" y2="21" />
      <line x1="15" y1="3" x2="15" y2="21" />
      <polyline points="12 5 10 7 14 7 12 5" />
      <polyline points="12 19 10 17 14 17 12 19" />
    </svg>
  )
}

export default Elevator
