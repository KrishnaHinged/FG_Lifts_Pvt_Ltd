import React from 'react'
import Card from '../Card'

export function GlassCard({ children, ...props }) {
  return (
    <Card background="glass" shadow="none" border={true} {...props}>
      {children}
    </Card>
  )
}

export default GlassCard
