import React from 'react'

export function Container({ children, className = '', as: Component = 'div', ...props }) {
  return (
    <Component className={`w-full max-w-[1440px] mx-auto px-6 lg:px-12 ${className}`} {...props}>
      {children}
    </Component>
  )
}

export default Container
