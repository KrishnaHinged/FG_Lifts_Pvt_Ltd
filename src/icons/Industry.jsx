import React from 'react'

export function Industry({
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
      aria-label={ariaLabel || 'Industry'}
      role={ariaLabel ? 'img' : undefined}
      {...props}
    >
      <path d="M22 21H2V3l7 4 7-4 6 4v14z" />
      <path d="M17 11h2v2h-2v-2zm-5 0h2v2h-2v-2zm-5 0h2v2H7v-2zm10 4h2v2h-2v-2zm-5 0h2v2h-2v-2zm-5 0h2v2H7v-2z" />
    </svg>
  )
}

export default Industry
