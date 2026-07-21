import React from 'react'
import Tag from '@/components/ui/Tag'

export function FilterBar({
  options = [],
  selected,
  onChange,
  className = '',
  ...props
}) {
  return (
    <div className={`flex flex-wrap gap-2.5 items-center justify-center ${className}`} {...props}>
      {options.map((opt) => (
        <Tag
          key={opt.value}
          variant="filter"
          active={selected === opt.value}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </Tag>
      ))}
    </div>
  )
}

export default FilterBar
