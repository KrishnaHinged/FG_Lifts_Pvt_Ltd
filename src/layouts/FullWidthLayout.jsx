'use client'

import React from 'react'

export function FullWidthLayout({
  children,
  className = '',
  ...props
}) {
  return (
    <div className={`w-full ${className}`} {...props}>
      {children}
    </div>
  )
}

export default FullWidthLayout
