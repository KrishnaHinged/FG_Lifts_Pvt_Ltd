import React from 'react'
import Typography from './Typography'

export function MonoText({ children, ...props }) {
  return (
    <Typography as="code" font="mono" size="sm" {...props}>
      {children}
    </Typography>
  )
}

export default MonoText
