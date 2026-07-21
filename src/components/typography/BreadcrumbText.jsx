import React from 'react'
import Typography from './Typography'

export function BreadcrumbText({ children, active = false, ...props }) {
  return (
    <Typography 
      as="span" 
      font="mono" 
      size="xs" 
      color={active ? 'default' : 'muted'} 
      className="uppercase tracking-wider font-medium"
      {...props}
    >
      {children}
    </Typography>
  )
}

export default BreadcrumbText
