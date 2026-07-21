import React from 'react'

export function SpecificationList({ items = [], className = '', ...props }) {
  return (
    <div className={`divide-y divide-[#E8E2DA] ${className}`} {...props}>
      {items.map((item, idx) => (
        <div key={idx} className="py-3 flex justify-between gap-4 text-sm">
          <span className="font-sans font-medium text-[#7A7A7A]">{item.label}</span>
          <span className="font-mono text-[#111111] text-right font-semibold">{item.value}</span>
        </div>
      ))}
    </div>
  )
}

export default SpecificationList
