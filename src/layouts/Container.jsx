'use client'

import React from 'react'

export function Container({
  children,
  className = '',
  size = 'default', // default | compact | full
  as: Component = 'div',
  ...props
}) {
  const sizeClasses = {
    default: 'max-w-[1440px]',
    compact: 'max-w-[1200px]',
    full: 'max-w-full'
  }

  return (
    <Component 
      className={`w-full mx-auto px-6 lg:px-12 ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Container
