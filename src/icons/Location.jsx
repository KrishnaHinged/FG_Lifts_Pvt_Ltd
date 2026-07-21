import React from 'react'

export function Location({
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
      aria-label={ariaLabel || 'Location'}
      role={ariaLabel ? 'img' : undefined}
      {...props}
    >
      <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

export default Location
