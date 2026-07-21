'use client'

import React from 'react'
import { Search } from 'lucide-react'
import Input from './Input'

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search directory entries...',
  className = '',
  onSubmit,
  ...props
}) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && onSubmit) {
      onSubmit(value)
    }
  }

  return (
    <div className={`relative w-full ${className}`}>
      <span className="absolute inset-y-0 left-5 flex items-center text-[#7A7A7A] pointer-events-none">
        <Search size={16} />
      </span>
      <Input
        type="search"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="pl-12"
        {...props}
      />
    </div>
  )
}

export default SearchBar
