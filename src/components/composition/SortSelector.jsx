'use client'

import React from 'react'
import Select from '@/components/forms/Select'

export function SortSelector({
  value,
  onChange,
  options = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'name_asc', label: 'Name (A-Z)' },
    { value: 'name_desc', label: 'Name (Z-A)' }
  ],
  className = '',
  ...props
}) {
  return (
    <div className={`w-[180px] ${className}`} {...props}>
      <Select
        placeholder=""
        options={options}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default SortSelector
