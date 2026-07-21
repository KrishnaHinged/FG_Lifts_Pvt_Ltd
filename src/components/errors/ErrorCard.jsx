'use client'

import React from 'react'
import { AlertCircle } from 'lucide-react'

export function ErrorCard({
  title = 'System Fault',
  description = 'We encountered an error processing your query. Please reload.',
  onRetry,
  className = ''
}) {
  return (
    <div className={`bg-white border border-[#E8E2DA] rounded-[32px] p-8 text-center max-w-md mx-auto shadow-sm space-y-6 ${className}`}>
      <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
        <AlertCircle size={28} />
      </div>
      <div className="space-y-2">
        <h3 className="font-sans text-lg font-bold text-[#111111]">{title}</h3>
        <p className="font-sans text-sm text-[#7A7A7A] leading-relaxed">{description}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-3 rounded-full bg-[#0E4FB3] hover:bg-[#0b3c8a] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
        >
          Try Again
        </button>
      )}
    </div>
  )
}

export default ErrorCard
