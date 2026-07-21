import React from 'react'

export function VerticalDivider({ className = '', ...props }) {
  return (
    <div className={`w-[1px] self-stretch bg-[#E8E2DA] min-h-[1.5rem] ${className}`} {...props} />
  )
}

export default VerticalDivider
