'use client'

import React from 'react'
import Spinner from '@/components/ui/Spinner'

export function PageLoader({ className = '' }) {
  return (
    <div className={`w-full min-h-[50vh] flex flex-col items-center justify-center space-y-4 ${className}`}>
      <Spinner size="lg" color="primary" />
      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#7A7A7A]">
        Fetching Information...
      </span>
    </div>
  )
}

export default PageLoader
