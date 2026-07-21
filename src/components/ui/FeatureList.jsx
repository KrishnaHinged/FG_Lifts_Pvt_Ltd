import React from 'react'

export function FeatureList({ items = [], className = '', ...props }) {
  return (
    <div className={`space-y-6 ${className}`} {...props}>
      {items.map((item, idx) => (
        <div key={idx} className="flex gap-4 items-start">
          {item.icon && (
            <div className="w-10 h-10 rounded-full bg-[#EDE8E2] text-[#111111] flex items-center justify-center flex-shrink-0 mt-0.5">
              <item.icon size={18} />
            </div>
          )}
          <div className="space-y-1">
            <h4 className="font-sans text-sm font-bold text-[#111111]">{item.title}</h4>
            <p className="font-sans text-xs text-[#7A7A7A] leading-relaxed">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default FeatureList
