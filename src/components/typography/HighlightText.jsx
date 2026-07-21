import React from 'react'
import Typography from './Typography'

export function HighlightText({
  children,
  highlightClass = 'bg-[#EDE8E2]/50 text-[#111111] px-1 rounded-md',
  ...props
}) {
  return (
    <Typography as="span" className={highlightClass} {...props}>
      {children}
    </Typography>
  )
}

export default HighlightText
