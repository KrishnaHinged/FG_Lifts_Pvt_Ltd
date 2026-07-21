import React from 'react'
import Typography from './Typography'

export function SubHeading({ children, ...props }) {
  return (
    <Typography as="p" font="sans" size="md" color="muted" {...props}>
      {children}
    </Typography>
  )
}

export default SubHeading
