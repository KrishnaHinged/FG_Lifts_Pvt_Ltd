import React from 'react'

export function FilterGroup({ children, title, className = '', ...props }) {
  return (
    <div className={`space-y-3 ${className}`} {...props}>
      {title && (
        <h5 className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#7A7A7A]">
          {title}
        </h5>
      )}
      <div className="flex flex-wrap gap-2">
        {children}
      </div>
    </div>
  )
}

export default FilterGroup
