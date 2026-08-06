'use client'

import { useState, useEffect, useRef, memo, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { Bell, Command } from 'lucide-react'
import CommandPalette from './CommandPalette'
import NotificationCenter from './NotificationCenter'

export default memo(function AdminTopbar({ admin }) {
  const pathname = usePathname()
  const [pendingCount, setPendingCount] = useState(0)
  const [showNotifications, setShowNotifications] = useState(false)
  const hasFetched = useRef(false)

  // Determine current page title based on pathname
  const getPageTitle = () => {
    const segments = pathname.split('/')
    const pageSegment = segments[2] || 'dashboard'
    return pageSegment.charAt(0).toUpperCase() + pageSegment.slice(1)
  }

  // Fetch pending inquiries count ONCE on mount — not on every pathname change
  useEffect(() => {
    if (hasFetched.current) return
    hasFetched.current = true

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
  }, [])

  const getInitials = (name = '') => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .slice(0, 2)
      .join('')
      .toUpperCase()
  }

  const toggleNotifications = useCallback(() => {
    setShowNotifications(prev => !prev)
  }, [])

  const closeNotifications = useCallback(() => {
    setShowNotifications(false)
  }, [])

  return (
    <>
      <header className="sticky top-0 z-30 h-16 bg-[#F5F0EB] border-b border-[#E8E2DA] px-6 lg:px-8 flex items-center justify-between select-none">
        
        {/* Left - Page Title */}
        <div className="flex items-center gap-4">
          <h2 className="font-sans font-bold text-[#111111] text-base leading-none">
            {getPageTitle()}
          </h2>
        </div>
 
        {/* Right - Notification / Search / User */}
        <div className="flex items-center gap-4 sm:gap-6">
          
          {/* Command Palette Trigger indicator */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#E8E2DA] bg-white/50 text-[10px] font-mono text-[#7A7A7A]">
            <Command size={12} />
            <span>Press</span>
            <kbd className="bg-white border border-[#E8E2DA] px-1 rounded shadow-2xs font-bold text-[#111111]">Ctrl + K</kbd>
            <span>for commands</span>
          </div>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={toggleNotifications}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-neutral-100 transition cursor-pointer border-none bg-transparent"
              title="Notifications"
            >
              <Bell className="w-4 h-4 text-[#555555]" />
            </button>
            {pendingCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#D72638] text-white text-[9px] font-mono font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                {pendingCount > 9 ? '9+' : pendingCount}
              </span>
            )}
          </div>

          {/* Separator line */}
          <div className="w-px h-6 bg-[#E8E2DA]" />

          {/* User Card Profile */}
          {admin && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#0E4FB3] text-white flex items-center justify-center font-sans font-bold text-xs">
                {getInitials(admin.name)}
              </div>
              <div className="hidden sm:flex flex-col items-start leading-none">
                <span className="font-sans text-xs font-semibold text-[#111111] leading-tight">
                  {admin.name}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#7A7A7A] leading-none mt-0.5">
                  {admin.role?.replace('_', ' ')}
                </span>
              </div>
            </div>
          )}

        </div>

      </header>

      {/* Command Palette Modal */}
      <CommandPalette />

      {/* Notification Center Drawer */}
      <NotificationCenter
        isOpen={showNotifications}
        onClose={closeNotifications}
        onUnreadCountChange={setPendingCount}
      />
    </>
  )
})
