import React from 'react'
import Typography from './Typography'

export function GradientText({
  children,
  gradient = 'from-[#0E4FB3] to-[#E8600A]', // default gradient
  className = '',
  ...props
}) {
  return (
    <Typography
      as="span"
      className={`bg-clip-text text-transparent bg-gradient-to-r ${gradient} ${className}`}
      {...props}
    >
      {children}
    </Typography>
  )
}

export default GradientText
