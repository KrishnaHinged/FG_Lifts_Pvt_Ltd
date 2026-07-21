'use client'

import React from 'react'
import Button from '../Button'

export function LinkButton({ children, ...props }) {
  return (
    <Button variant="text" {...props}>
      {children}
    </Button>
  )
}

export default LinkButton
