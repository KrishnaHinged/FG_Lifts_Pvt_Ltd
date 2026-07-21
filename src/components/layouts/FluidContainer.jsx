import React from 'react'

export function FluidContainer({ children, className = '', as: Component = 'div', ...props }) {
  return (
    <Component className={`w-full px-6 lg:px-12 ${className}`} {...props}>
      {children}
    </Component>
  )
}

export default FluidContainer
