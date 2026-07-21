import React from 'react'

export function Stack({
  children,
  className = '',
  direction = 'vertical', // vertical | horizontal
  align = 'stretch', // start | center | end | stretch
  justify = 'start', // start | center | end | between
  gap = '4', // spacing unit (1, 2, 4, 6, 8, etc.)
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

  return (
    <Component
      className={`flex ${dirClass} ${alignClasses[align]} ${justifyClasses[justify]} gap-${gap} ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Stack
