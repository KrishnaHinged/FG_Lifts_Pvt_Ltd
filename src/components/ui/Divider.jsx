import React from 'react'

export function Divider({ className = '', ...props }) {
  return (
    <hr className={`border-t border-[#E8E2DA] my-6 w-full ${className}`} {...props} />
  )
}

export default Divider
