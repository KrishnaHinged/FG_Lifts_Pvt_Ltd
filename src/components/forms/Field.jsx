'use client'

import React from 'react'

export function FieldLabel({ children, required = false, htmlFor }) {
  return (
    <label htmlFor={htmlFor} className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#7A7A7A] mb-1.5 block">
      {children} {required && <span className="text-[#D72638]">*</span>}
    </label>
  )
}

export function FieldError({ children }) {
  if (!children) return null
  return (
    <span className="font-mono text-[9px] text-[#D72638] tracking-wide uppercase mt-1 block">
      {children}
    </span>
  )
}

export function FieldHint({ children }) {
  if (!children) return null
  return (
    <span className="font-sans text-xs text-[#7A7A7A] mt-1 block leading-normal">
      {children}
    </span>
  )
}

export function Field({
  children,
  label,
  required = false,
  error = '',
  hint = '',
  id,
  className = '',
  ...props
}) {
  return (
    <div className={`w-full flex flex-col ${className}`} {...props}>
      {label && <FieldLabel htmlFor={id} required={required}>{label}</FieldLabel>}
      {children}
      {error && <FieldError>{error}</FieldError>}
      {hint && !error && <FieldHint>{hint}</FieldHint>}
    </div>
  )
}

export default Field
