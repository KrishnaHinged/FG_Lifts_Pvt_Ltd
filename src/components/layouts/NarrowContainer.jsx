import React from 'react'

export function NarrowContainer({ children, className = '', as: Component = 'div', ...props }) {
  return (
    <Component className={`w-full max-w-[800px] mx-auto px-6 ${className}`} {...props}>
      {children}
    </Component>
  )
}

export default NarrowContainer
