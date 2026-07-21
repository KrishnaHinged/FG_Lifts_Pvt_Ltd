'use client'

import React from 'react'

export function Stack({
  children,
  className = '',
  direction = 'vertical', // vertical | horizontal
  align = 'stretch', // start | center | end | stretch
  justify = 'start', // start | center | end | between
  gap = 'normal', // tight | normal | loose | none
  as: Component = 'div',
  ...props
}) {
  const dirClass = direction === 'vertical' ? 'flex-col' : 'flex-row'
  
  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch'
  }

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between'
  }

  const gapClasses = {
    tight: direction === 'vertical' ? 'space-y-2' : 'space-x-2',
    normal: direction === 'vertical' ? 'space-y-4 lg:space-y-6' : 'space-x-4 lg:space-x-6',
    loose: direction === 'vertical' ? 'space-y-8 lg:space-y-12' : 'space-x-8 lg:space-x-12',
    none: ''
  }

  return (
    <Component
      className={`flex ${dirClass} ${alignClasses[align]} ${justifyClasses[justify]} ${gapClasses[gap]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Stack
