import React from 'react'

export function AutoGrid({
  children,
  className = '',
  minWidth = '280px', // e.g. 250px, 300px
  gap = '6', // tailwind spacing unit or pixels (customized)
  as: Component = 'div',
  ...props
}) {
  const style = {
    gridTemplateColumns: `repeat(auto-fill, minmax(${minWidth}, 1fr))`,
    gap: gap.includes('px') || gap.includes('rem') ? gap : `var(--spacing-${gap}, 1.5rem)`
  }

  return (
    <Component
      className={`grid ${className}`}
      style={style}
      {...props}
    >
      {children}
    </Component>
  )
}

export default AutoGrid
