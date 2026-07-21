import React from 'react'
import Typography from './Typography'

export function SmallText({ children, ...props }) {
  return (
    <Typography as="span" font="sans" size="sm" {...props}>
      {children}
    </Typography>
  )
}

export default SmallText
