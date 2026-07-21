'use client'

import React from 'react'

export function CenteredLayout({
  children,
  className = '',
  background = 'creamAlt',
  ...props
}) {
  const bgClasses = {
    cream: 'bg-[#F5F0EB]',
    creamAlt: 'bg-[#EDE8E2]',
    dark: 'bg-[#111111]',
    white: 'bg-white'
  }

  return (
    <div 
      className={`min-h-screen w-full flex items-center justify-center p-4 md:p-6 lg:p-8 ${bgClasses[background]} ${className}`}
      {...props}
    >
      <div className="w-full max-w-md mx-auto">
        {children}
      </div>
    </div>
  )
}

export default CenteredLayout
