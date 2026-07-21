import React from 'react'

export function FormGroup({ children, title, className = '', ...props }) {
  return (
    <div className={`space-y-6 ${className}`} {...props}>
      {title && (
        <h4 className="font-sans text-sm font-bold uppercase tracking-wider text-[#111111] border-b border-[#E8E2DA] pb-2">
          {title}
        </h4>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {children}
      </div>
    </div>
  )
}

export default FormGroup
