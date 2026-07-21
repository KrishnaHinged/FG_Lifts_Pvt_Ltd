import React from 'react'
import Typography from './Typography'

export function Paragraph({ children, ...props }) {
  return (
    <Typography as="p" font="sans" size="base" color="secondary" {...props}>
      {children}
    </Typography>
  )
}

export default Paragraph
