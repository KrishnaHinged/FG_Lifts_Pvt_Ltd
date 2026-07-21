'use client'

import React from 'react'
import Button from '../Button'

export function SecondaryButton({ children, ...props }) {
  return (
    <Button variant="secondary" {...props}>
      {children}
    </Button>
  )
}

export default SecondaryButton
