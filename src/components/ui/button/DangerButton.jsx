'use client'

import React from 'react'
import Button from '../Button'

export function DangerButton({ children, ...props }) {
  return (
    <Button variant="danger" {...props}>
      {children}
    </Button>
  )
}

export default DangerButton
