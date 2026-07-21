import React from 'react'

export function BulletList({ items = [], className = '', ...props }) {
  return (
    <ul className={`list-disc list-inside space-y-3 font-sans text-sm text-[#525252] ${className}`} {...props}>
      {items.map((item, idx) => (
        <li key={idx} className="leading-relaxed">
          {item}
        </li>
      ))}
    </ul>
  )
}

export default BulletList
