'use client'

import React from 'react'

export function EmptyState({
  title = 'No Records Found',
  description = 'There are no active records in this directory matching the criteria.',
  icon: Icon,
  action,
  className = ''
}) {
  return (
    <div className={`bg-white border border-[#E8E2DA] rounded-[32px] p-10 text-center max-w-md mx-auto shadow-sm space-y-6 ${className}`}>
      {Icon && (
        <div className="w-16 h-16 rounded-full bg-[#EDE8E2] text-[#111111] flex items-center justify-center mx-auto">
          <Icon size={28} />
        </div>
      )}
      <div className="space-y-2">
        <h3 className="font-sans text-lg font-bold text-[#111111]">{title}</h3>
        <p className="font-sans text-sm text-[#7A7A7A] leading-relaxed">{description}</p>
      </div>
      {action && <div className="pt-2">{action}</div>}
    </div>
  )
}

export default EmptyState
