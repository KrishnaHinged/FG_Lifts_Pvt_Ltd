import React from 'react'
import Surface from './Surface'

export function Elevated({
  children,
  className = '',
  elevation = 'md', // sm | md | lg | xl
  ...props
}) {
  const elevationClasses = {
    sm: 'shadow-sm border border-[#E8E2DA]',
    md: 'shadow-md border border-[#E8E2DA]/85',
    lg: 'shadow-lg border border-[#E8E2DA]/70',
    xl: 'shadow-xl border border-[#E8E2DA]/50'
  }

  return (
    <Surface
      background="white"
      className={`${elevationClasses[elevation] || elevationClasses.md} rounded-[32px] ${className}`}
      {...props}
    >
      {children}
    </Surface>
  )
}

export default Elevated
