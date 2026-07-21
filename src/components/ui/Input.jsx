'use client'

import React from 'react'

export default function Input({
  label,
  type = 'text',
  placeholder = '',
  name,
  value,
  onChange,
  required = false,
  error = '',
  disabled = false,
  className = ''
}) {
  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#7A7A7A]">
          {label} {required && <span className="text-[#D72638]">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-5 py-3.5 rounded-full border border-[#E8E2DA] bg-white text-[#111111] font-sans text-sm focus:outline-none focus:border-[#0E4FB3] transition-colors placeholder:text-neutral-400 ${disabled ? 'opacity-50 cursor-not-allowed bg-neutral-50' : ''} ${error ? 'border-[#D72638] focus:border-[#D72638]' : ''}`}
      />
      {error && (
        <span className="font-mono text-[9px] text-[#D72638] tracking-wide uppercase mt-0.5">
          {error}
        </span>
      )}
    </div>
  )
}
