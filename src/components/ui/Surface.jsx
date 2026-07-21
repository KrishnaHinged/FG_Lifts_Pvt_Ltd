import React from 'react'

export function Surface({
  children,
  className = '',
  background = 'cream', // cream | creamAlt | dark | darkAlt | white | transparent
  as: Component = 'div',
  ...props
}) {
  const bgClasses = {
    cream: 'bg-[#F5F0EB]',
    creamAlt: 'bg-[#EDE8E2]',
    dark: 'bg-[#111111] text-[#F5F0EB]',
    darkAlt: 'bg-[#1A1A1A] text-[#F5F0EB]',
    white: 'bg-white',
    transparent: 'bg-transparent'
  }

  return (
    <Component className={`${bgClasses[background] || bgClasses.cream} ${className}`} {...props}>
      {children}
    </Component>
  )
}

export default Surface
