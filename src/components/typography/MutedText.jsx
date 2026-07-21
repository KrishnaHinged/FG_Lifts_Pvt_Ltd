import React from 'react'
import Typography from './Typography'

export function MutedText({ children, ...props }) {
  return (
    <Typography as="span" font="sans" color="muted" {...props}>
      {children}
    </Typography>
  )
}

export default MutedText
