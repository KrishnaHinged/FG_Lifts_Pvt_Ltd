import React from 'react'

export function Search({
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
      aria-label={ariaLabel || 'Search'}
      role={ariaLabel ? 'img' : undefined}
      {...props}
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

export default Search
