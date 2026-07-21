import React from 'react'
import Typography from './Typography'

export function Eyebrow({ children, ...props }) {
  return (
    <Typography as="span" font="mono" size="xs" color="primary" className="uppercase tracking-widest font-bold block mb-3" {...props}>
      {children}
    </Typography>
  )
}

export default Eyebrow
