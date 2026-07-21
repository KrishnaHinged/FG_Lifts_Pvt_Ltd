import React from 'react'
import Surface from './Surface'

export function Panel({ children, className = '', ...props }) {
  return (
    <Surface
      background="white"
      className={`border border-[#E8E2DA] rounded-[32px] p-6 shadow-sm ${className}`}
      {...props}
    >
      {children}
    </Surface>
  )
}

export default Panel
