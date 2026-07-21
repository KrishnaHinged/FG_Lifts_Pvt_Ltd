import React from 'react'
import Typography from './Typography'

export function CardTitle({ children, ...props }) {
  return (
    <Typography as="h3" font="sans" size="base" weight="bold" {...props}>
      {children}
    </Typography>
  )
}

export default CardTitle
