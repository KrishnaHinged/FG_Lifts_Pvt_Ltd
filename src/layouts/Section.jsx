'use client'

import React from 'react'

export function Section({
  children,
  className = '',
  id,
  size = 'default', // default | compact | none
  background = 'cream', // cream | creamAlt | dark | darkAlt | transparent
  as: Component = 'section',
  ...props
}) {
  const sizeClasses = {
    default: 'py-[120px] lg:py-[180px]',
    compact: 'py-20 lg:py-28',
    none: 'py-0'
  }

  const bgClasses = {
    cream: 'bg-[#F5F0EB]',
    creamAlt: 'bg-[#EDE8E2]',
    dark: 'bg-[#111111] text-[#F5F0EB]',
    darkAlt: 'bg-[#1A1A1A] text-[#F5F0EB]',
    transparent: 'bg-transparent'
  }

  return (
    <Component
      id={id}
      className={`relative w-full overflow-hidden ${sizeClasses[size]} ${bgClasses[background]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Section
