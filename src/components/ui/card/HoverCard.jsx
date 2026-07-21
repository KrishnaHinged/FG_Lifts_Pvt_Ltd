import React from 'react'
import Card from '../Card'

export function HoverCard({ children, ...props }) {
  return (
    <Card hoverable={true} shadow="md" {...props}>
      {children}
    </Card>
  )
}

export default HoverCard
