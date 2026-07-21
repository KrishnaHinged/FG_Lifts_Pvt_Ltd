import React from 'react'

export function Glass({
  children,
  className = '',
  as: Component = 'div',
  ...props
}) {
  return (
    <Component
      className={`bg-white/45 backdrop-blur-[10px] border border-white/50 shadow-sm ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Glass
