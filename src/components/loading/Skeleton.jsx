'use client'

import React from 'react'

export function Skeleton({
  className = '',
  variant = 'text', // text | circular | rectangular
  ...props
}) {
  const variantClasses = {
    text: 'h-4 w-full rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-2xl'
  }

  return (
    <div
      className={`animate-pulse bg-[#EDE8E2]/60 ${variantClasses[variant]} ${className}`}
      {...props}
    />
  )
}

export default Skeleton
