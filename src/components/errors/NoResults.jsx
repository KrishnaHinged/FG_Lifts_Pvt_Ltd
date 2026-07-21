'use client'

import React from 'react'
import { Inbox } from 'lucide-react'
import EmptyState from './EmptyState'

export function NoResults({
  title = 'No Results Matching Filters',
  description = 'Try widening your filters or clearing search criteria.',
  onClear
}) {
  return (
    <EmptyState
      title={title}
      description={description}
      icon={Inbox}
      action={onClear && (
        <button
          onClick={onClear}
          className="px-6 py-2.5 rounded-full border border-[#EDE8E2] text-xs font-bold uppercase tracking-wider text-[#111111] hover:bg-[#EDE8E2]/50 transition-colors cursor-pointer"
        >
          Reset Filters
        </button>
      )}
    />
  )
}

export default NoResults
