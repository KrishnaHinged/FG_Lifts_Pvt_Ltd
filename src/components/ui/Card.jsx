import React from 'react'

export function Card({
  children,
  className = '',
  onClick,
  hoverable = false,
  background = 'white', // white | cream | creamAlt | dark | darkAlt | glass | transparent
  shadow = 'sm', // none | sm | md | lg | xl
  radius = 'card', // card | cardInner | xl | lg | md | none
  padding = '6', // tailwind padding unit
  border = true,
  ...props
}) {
  const bgClasses = {
    white: 'bg-white',
    cream: 'bg-[#F5F0EB]',
    creamAlt: 'bg-[#EDE8E2]',
    dark: 'bg-[#111111] text-[#F5F0EB]',
    darkAlt: 'bg-[#1A1A1A] text-[#F5F0EB]',
    glass: 'bg-white/45 backdrop-blur-[10px] border-white/50 shadow-sm',
    transparent: 'bg-transparent'
  }

  const shadowClasses = {
    none: 'shadow-none',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  }

  const radiusClasses = {
    card: 'rounded-[32px] md:rounded-[40px]',
    cardInner: 'rounded-[1.5rem]',
    xl: 'rounded-2xl',
    lg: 'rounded-xl',
    md: 'rounded-lg',
    none: 'rounded-none'
  }

  const baseStyle = "transition-all duration-[350ms] ease-out overflow-hidden"
  const hoverStyle = hoverable 
    ? "hover:translate-y-[-4px] hover:shadow-md cursor-pointer border-[#111111]/30 hover:border-[#111111]" 
    : ""
  
  const borderClass = border ? 'border border-[#E8E2DA]' : ''

  return (
    <div 
      onClick={onClick}
      className={`${baseStyle} ${bgClasses[background] || bgClasses.white} ${shadowClasses[shadow]} ${radiusClasses[radius]} ${borderClass} p-${padding} ${hoverStyle} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
