'use client'

import React from 'react'
import Button from '../Button'
import Arrow from '@/icons/Arrow'

export function CTAButton({ children, ...props }) {
  return (
    <Button variant="primary" icon={Arrow} {...props}>
      {children}
    </Button>
  )
}

export default CTAButton
