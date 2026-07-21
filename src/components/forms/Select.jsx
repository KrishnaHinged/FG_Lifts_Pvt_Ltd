'use client'

import React from 'react'

export function Select({
  name,
  value,
  onChange,
  options = [],
  placeholder = 'Select option...',
  disabled = false,
  error = false,
  className = '',
  ...props
}) {
  return (
    <div className="relative w-full">
      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full appearance-none px-5 py-3.5 rounded-full border border-[#E8E2DA] bg-white text-[#111111] font-sans text-sm focus:outline-none focus:border-[#0E4FB3] transition-colors ${
          disabled ? 'opacity-50 cursor-not-allowed bg-neutral-50' : ''
        } ${error ? 'border-[#D72638] focus:border-[#D72638]' : ''} ${className}`}
        {...props}
      >
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-[#7A7A7A]">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
        </svg>
      </div>
    </div>
  )
}

export default Select
