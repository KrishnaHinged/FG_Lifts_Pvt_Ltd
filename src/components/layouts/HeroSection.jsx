import React from 'react'

export function HeroSection({ children, className = '', ...props }) {
  return (
    <section 
      className={`relative w-full overflow-hidden pt-[160px] pb-[100px] lg:pt-[220px] lg:pb-[140px] bg-[#111111] text-[#F5F0EB] ${className}`} 
      {...props}
    >
      {children}
    </section>
  )
}

export default HeroSection
