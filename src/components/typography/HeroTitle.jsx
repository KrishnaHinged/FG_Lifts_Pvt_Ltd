import React from 'react'
import Typography from './Typography'

export function HeroTitle({ children, ...props }) {
  return (
    <Typography as="h1" font="display" size="xxl" weight="light" className="tracking-tight" {...props}>
      {children}
    </Typography>
  )
}

export default HeroTitle
