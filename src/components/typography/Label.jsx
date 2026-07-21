import React from 'react'
import Typography from './Typography'

export function Label({ children, ...props }) {
  return (
    <Typography as="label" font="mono" size="xs" weight="semibold" className="uppercase" {...props}>
      {children}
    </Typography>
  )
}

export default Label
