'use client'

import React from 'react'

export function Grid({
  children,
  className = '',
  cols = '3', // 1 | 2 | 3 | 4 | 12
  gap = 'default', // default | compact | wide | none
  as: Component = 'div',
  ...props
}) {
  const colClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    12: 'grid-cols-12'
  }

  const gapClasses = {
    default: 'gap-6 lg:gap-10',
    compact: 'gap-4',
    wide: 'gap-8 lg:gap-16',
    none: 'gap-0'
  }

  return (
    <Component
      className={`grid ${colClasses[cols]} ${gapClasses[gap]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Grid
