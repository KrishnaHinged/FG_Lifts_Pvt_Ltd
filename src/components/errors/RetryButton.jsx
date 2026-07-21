'use client'

import React from 'react'

export function RetryButton({ onClick, text = 'Retry Action', className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2.5 rounded-full border border-[#EDE8E2] text-xs font-bold uppercase tracking-wider text-[#111111] hover:bg-[#EDE8E2]/50 transition-colors cursor-pointer ${className}`}
    >
      {text}
    </button>
  )
}

export default RetryButton
