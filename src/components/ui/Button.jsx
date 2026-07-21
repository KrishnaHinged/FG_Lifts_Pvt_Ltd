'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { colors } from '@/design-system/tokens/colors'
import { radius } from '@/design-system/tokens/radius'
import { transitions } from '@/design-system/tokens/transitions'

export default function Button({
  variant = 'primary', // primary | secondary | outline | text | danger
  size = 'md', // sm | md | lg
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  type = 'button',
  children,
  className = '',
  icon: Icon
}) {
  const baseStyle = "inline-flex items-center justify-center font-sans font-bold uppercase tracking-wider transition-all duration-300 select-none outline-none"
  
  const sizeStyles = {
    sm: "px-4 py-2 text-[10px]",
    md: "px-6 py-3 text-[11px]",
    lg: "px-8 py-4 text-[12px]"
  }

  const variantStyles = {
    primary: "bg-[#0E4FB3] text-white hover:bg-[#0b3c8a] active:bg-[#082a63]",
    secondary: "bg-[#EDE8E2] text-[#111111] hover:bg-[#E8E2DA] active:bg-[#d8cfc3]",
    outline: "bg-transparent text-[#111111] border border-[#E8E2DA] hover:border-[#111111] hover:bg-neutral-50",
    text: "bg-transparent text-[#111111] hover:underline px-0 py-0",
    danger: "bg-[#D72638] text-white hover:bg-[#b81d2d] active:bg-[#941724]"
  }

  const widthStyle = fullWidth ? 'w-full' : ''
  const disabledStyle = (disabled || loading) ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'
  const roundedStyle = variant === 'text' ? 'rounded-none' : 'rounded-full'

  return (
    <motion.button
      whileTap={disabled || loading ? {} : { scale: 0.98 }}
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyle} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${disabledStyle} ${roundedStyle} ${className}`}
    >
      {loading ? (
        <span className="mr-2 flex items-center justify-center">
          <svg className="animate-spin h-3 w-3 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Loading...
        </span>
      ) : (
        <>
          {Icon && <span className="mr-2 inline-flex items-center"><Icon size={14} /></span>}
          {children}
        </>
      )}
    </motion.button>
  )
}
