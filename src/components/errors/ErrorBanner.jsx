'use client'

import React from 'react'
import { AlertTriangle, X } from 'lucide-react'

export function ErrorBanner({
  message = 'Connection lost. Retrying...',
  onDismiss,
  className = ''
}) {
  return (
    <div className={`flex items-center justify-between gap-3 p-4 rounded-xl border border-red-200 bg-red-50 text-red-900 text-sm font-sans ${className}`}>
      <div className="flex items-center gap-2">
        <AlertTriangle size={18} className="text-red-600 flex-shrink-0" />
        <span>{message}</span>
      </div>
      {onDismiss && (
        <button 
          onClick={onDismiss}
          className="text-red-500 hover:text-red-800 p-0.5 rounded-full"
        >
          <X size={16} />
        </button>
      )}
    </div>
  )
}

export default ErrorBanner
