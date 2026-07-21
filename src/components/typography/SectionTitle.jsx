import React from 'react'
import Typography from './Typography'

export function SectionTitle({ children, ...props }) {
  return (
    <Typography as="h2" font="display" size="xl" weight="medium" {...props}>
      {children}
    </Typography>
  )
}

export default SectionTitle
