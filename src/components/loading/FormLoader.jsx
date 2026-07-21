'use client'

import React from 'react'
import Skeleton from './Skeleton'

export function FormLoader({ fieldsCount = 4, className = '' }) {
  return (
    <div className={`space-y-6 bg-white border border-[#E8E2DA] rounded-[32px] p-8 ${className}`}>
      <div className="space-y-2">
        <Skeleton variant="text" className="w-1/3 h-6" />
        <Skeleton variant="text" className="w-2/3 h-4" />
      </div>
      <div className="space-y-4">
        {Array.from({ length: fieldsCount }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton variant="text" className="w-1/4 h-4" />
            <Skeleton variant="rectangular" className="h-[48px] w-full" />
          </div>
        ))}
      </div>
      <Skeleton variant="rectangular" className="h-[48px] w-full" />
    </div>
  )
}

export default FormLoader
