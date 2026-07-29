import React from 'react'

export function Section({ children, className = '', background = 'cream', id, ...props }) {
  const bgClasses = {
    cream: 'bg-[#F5F0EB]',
    creamAlt: 'bg-[#EDE8E2]',
    dark: 'bg-[#111111] text-[#F5F0EB]',
    darkAlt: 'bg-[#1A1A1A] text-[#F5F0EB]',
    white: 'bg-white',
    transparent: 'bg-transparent'
  }

  return (
    <section 
      id={id} 
      className={`relative w-full overflow-clip py-[120px] lg:py-[180px] ${bgClasses[background]} ${className}`} 
      {...props}
    >
      {children}
    </section>
  )
}

export default Section
