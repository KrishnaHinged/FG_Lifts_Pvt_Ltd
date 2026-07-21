'use client'

import React from 'react'

export function InlineError({ message, className = '' }) {
  if (!message) return null

  return (
    <span className={`block text-xs text-red-600 font-sans mt-1.5 ${className}`}>
      {message}
    </span>
  )
}

export default InlineError
