import React from 'react'

export function CenteredContainer({ children, className = '', as: Component = 'div', ...props }) {
  return (
    <Component className={`w-full max-w-md mx-auto px-6 flex flex-col items-center text-center justify-center ${className}`} {...props}>
      {children}
    </Component>
  )
}

export default CenteredContainer
