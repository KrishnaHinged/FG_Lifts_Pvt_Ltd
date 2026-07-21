'use client'

import React from 'react'
import Button from '../Button'

export function GhostButton({ children, ...props }) {
  return (
    <Button variant="ghost" {...props}>
      {children}
    </Button>
  )
}

export default GhostButton
