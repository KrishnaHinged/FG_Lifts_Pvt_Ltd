import React from 'react'

export function ResponsiveGrid({
  children,
  className = '',
  sm = '1',
  md = '2',
  lg = '3',
  xl = '4',
  gap = '6',
  as: Component = 'div',
  ...props
}) {
  const smClass = `grid-cols-${sm}`
  const mdClass = `md:grid-cols-${md}`
  const lgClass = `lg:grid-cols-${lg}`
  const xlClass = `xl:grid-cols-${xl}`

  return (
    <Component
      className={`grid ${smClass} ${mdClass} ${lgClass} ${xlClass} gap-${gap} ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}

export default ResponsiveGrid
