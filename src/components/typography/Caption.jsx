import React from 'react'
import Typography from './Typography'

export function Caption({ children, ...props }) {
  return (
    <Typography as="span" font="sans" size="xs" color="muted" {...props}>
      {children}
    </Typography>
  )
}

export default Caption
