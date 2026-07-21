'use client'

import React from 'react'

export function EmptyLayout({
  children,
  className = '',
  ...props
}) {
  return (
    <div className={`w-full min-h-screen ${className}`} {...props}>
      {children}
    </div>
  )
}

export default EmptyLayout
