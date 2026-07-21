'use client'

import React from 'react'
import Button from '../Button'

export function PrimaryButton({ children, ...props }) {
  return (
    <Button variant="primary" {...props}>
      {children}
    </Button>
  )
}

export default PrimaryButton
