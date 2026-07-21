import React from 'react'

export function IconList({ items = [], icon: GlobalIcon, className = '', ...props }) {
  return (
    <ul className={`space-y-3 font-sans text-sm text-[#525252] ${className}`} {...props}>
      {items.map((item, idx) => {
        const IconToRender = item.icon || GlobalIcon
        return (
          <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
            {IconToRender && (
              <span className="text-[#0E4FB3] mt-1 flex-shrink-0">
                <IconToRender size={16} />
              </span>
            )}
            <span>{item.text || item}</span>
          </li>
        )
      })}
    </ul>
  )
}

export default IconList
