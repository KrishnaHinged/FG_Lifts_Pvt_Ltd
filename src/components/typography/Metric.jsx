import React from 'react'
import Typography from './Typography'

export function Metric({ children, label, ...props }) {
  return (
    <div className="space-y-1">
      <Typography as="span" font="mono" size="xxl" weight="bold" className="block leading-none tracking-tight" {...props}>
        {children}
      </Typography>
      {label && (
        <Typography as="span" font="mono" size="xs" color="muted" className="uppercase tracking-widest font-semibold block">
          {label}
        </Typography>
      )}
    </div>
  )
}

export default Metric
