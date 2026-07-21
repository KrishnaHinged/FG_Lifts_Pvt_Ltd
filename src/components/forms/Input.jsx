'use client'

import React from 'react'

export function Input({
  type = 'text',
  name,
  value,
  onChange,
  placeholder = '',
  disabled = false,
  error = false,
  className = '',
  ...props
}) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full px-5 py-3.5 rounded-full border border-[#E8E2DA] bg-white text-[#111111] font-sans text-sm focus:outline-none focus:border-[#0E4FB3] transition-colors placeholder:text-neutral-400 ${
        disabled ? 'opacity-50 cursor-not-allowed bg-neutral-50' : ''
      } ${error ? 'border-[#D72638] focus:border-[#D72638]' : ''} ${className}`}
      {...props}
    />
  )
}

export default Input
