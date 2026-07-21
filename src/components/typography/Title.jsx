import React from 'react'
import Typography from './Typography'

export function Title({ children, ...props }) {
  return (
    <Typography as="h3" font="sans" size="md" weight="semibold" {...props}>
      {children}
    </Typography>
  )
}

export default Title
