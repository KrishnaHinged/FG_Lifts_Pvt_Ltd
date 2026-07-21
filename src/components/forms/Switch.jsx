'use client'

import React from 'react'

export function Switch({
  label,
  name,
  checked,
  onChange,
  disabled = false,
  className = '',
  ...props
}) {
  return (
    <label className={`inline-flex items-center gap-3 cursor-pointer select-none ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only peer"
          {...props}
        />
        <div className="w-10 h-6 bg-[#EDE8E2] border border-[#E8E2DA] rounded-full peer peer-focus:ring-2 peer-focus:ring-[#0E4FB3]/20 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-[#E8E2DA] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0E4FB3] peer-checked:border-transparent" />
      </div>
      {label && <span className="font-sans text-sm text-[#111111]/80">{label}</span>}
    </label>
  )
}

export default Switch
