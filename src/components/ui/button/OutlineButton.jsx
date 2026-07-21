'use client'

import React from 'react'
import Button from '../Button'

export function OutlineButton({ children, ...props }) {
  return (
    <Button variant="outline" {...props}>
      {children}
    </Button>
  )
}

export default OutlineButton
