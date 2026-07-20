'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Search, Bell, Menu } from 'lucide-react'

export default function AdminTopbar({ admin }) {
  const pathname = usePathname()
  const [pendingCount, setPendingCount] = useState(0)

  // Determine current page title based on pathname
  const getPageTitle = () => {
    const segments = pathname.split('/')
    const pageSegment = segments[2] || 'dashboard'
    return pageSegment.charAt(0).toUpperCase() + pageSegment.slice(1)
  }

  // Fetch pending inquiries count to populate notification badge
  useEffect(() => {
    async function fetchPending() {
      try {
        const res = await fetch('/api/admin/inquiries?status=New')
        if (!res.ok) return
        const data = await res.json()
        setPendingCount(data.inquiries?.length || 0)
      } catch {
        // Silent fail
      }
    }
    fetchPending()
  }, [pathname])

  const getInitials = (name = '') => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .slice(0, 2)
      .join('')
      .toUpperCase()
  }

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 lg:px-8 flex items-center justify-between z-10 flex-shrink-0 select-none">
      
      {/* Left - Page Title */}
      <div className="flex items-center gap-4">
        <h2 className="font-sans font-semibold text-gray-900 text-lg leading-none">
          {getPageTitle()}
        </h2>
      </div>

      {/* Right - Notification / Search / User */}
      <div className="flex items-center gap-6">
        
        {/* Search Toggle Icon */}
        <button
          className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer bg-transparent border-none outline-none transition-colors"
          title="Search"
          onClick={() => alert('Search functionality enabled')}
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F4F6F9] transition">
            <Bell className="w-4 h-4 text-[#6B7280]" />
          </button>
          {pendingCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#EF4444] text-white
                             text-[9px] font-mono font-bold w-4 h-4 rounded-full
                             flex items-center justify-center leading-none">
              {pendingCount > 9 ? '9+' : pendingCount}
            </span>
          )}
        </div>

        {/* Separator line */}
        <div className="w-px h-6 bg-gray-200" />

        {/* User Card Profile */}
        {admin && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-fg-blue text-white flex items-center justify-center font-sans font-bold text-xs">
              {getInitials(admin.name)}
            </div>
            <div className="hidden sm:flex flex-col items-start leading-none">
              <span className="font-sans text-xs font-semibold text-gray-900 leading-tight">
                {admin.name}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-wider text-gray-400 leading-none mt-0.5">
                {admin.role?.replace('_', ' ')}
              </span>
            </div>
          </div>
        )}

      </div>

    </header>
  )
}
