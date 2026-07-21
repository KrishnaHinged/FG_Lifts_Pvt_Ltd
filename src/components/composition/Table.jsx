import React from 'react'

export function Table({ children, className = '', ...props }) {
  return (
    <div className="w-full overflow-x-auto rounded-[24px] border border-[#E8E2DA] bg-white">
      <table className={`w-full border-collapse text-left font-sans text-sm ${className}`} {...props}>
        {children}
      </table>
    </div>
  )
}

export default Table
