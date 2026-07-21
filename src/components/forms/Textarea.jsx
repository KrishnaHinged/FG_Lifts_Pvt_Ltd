'use client'

import React from 'react'

export function Textarea({
  name,
  value,
  onChange,
  placeholder = '',
  rows = 4,
  disabled = false,
  error = false,
  className = '',
  ...props
}) {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full px-5 py-4 rounded-[20px] border border-[#E8E2DA] bg-white text-[#111111] font-sans text-sm focus:outline-none focus:border-[#0E4FB3] transition-colors resize-none placeholder:text-neutral-400 ${
        disabled ? 'opacity-50 cursor-not-allowed bg-neutral-50' : ''
      } ${error ? 'border-[#D72638] focus:border-[#D72638]' : ''} ${className}`}
      {...props}
    />
  )
}

export default Textarea
