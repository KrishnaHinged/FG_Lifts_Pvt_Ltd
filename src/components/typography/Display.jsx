import React from 'react'
import Typography from './Typography'

export function Display({ children, ...props }) {
  return (
    <Typography as="span" font="display" size="xxxl" weight="light" {...props}>
      {children}
    </Typography>
  )
}

export default Display
