import React from 'react'

export function TimelineList({ items = [], className = '', ...props }) {
  return (
    <div className={`relative border-l border-[#E8E2DA] ml-4 pl-8 space-y-12 ${className}`} {...props}>
      {items.map((item, idx) => (
        <div key={idx} className="relative">
          {/* Indicator Dot */}
          <div className="absolute -left-[37px] top-1.5 w-4 h-4 rounded-full bg-[#0E4FB3] border-4 border-white" />
          
          <div className="space-y-2">
            <span className="font-mono text-xs font-bold text-[#0E4FB3] tracking-wider uppercase block">
              {item.date || item.tag}
            </span>
            <h4 className="font-display text-lg font-medium text-[#111111]">{item.title}</h4>
            <p className="font-sans text-sm text-[#7A7A7A] leading-relaxed max-w-2xl">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TimelineList
