'use client'

import React from 'react'

export function Radio({
  label,
  name,
  value,
  checked,
  onChange,
  disabled = false,
  className = '',
  ...props
}) {
  return (
    <label className={`inline-flex items-center gap-3 cursor-pointer select-none ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="w-4.5 h-4.5 border-[#E8E2DA] text-[#0E4FB3] focus:ring-[#0E4FB3]"
        {...props}
      />
      {label && <span className="font-sans text-sm text-[#111111]/80">{label}</span>}
    </label>
  )
}

export default Radio
