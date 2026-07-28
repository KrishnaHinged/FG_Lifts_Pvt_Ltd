'use client'

import { memo } from 'react'
import { usePathname } from 'next/navigation'
import AdminSidebar from './AdminSidebar'
import AdminTopbar from './AdminTopbar'

export default memo(function AdminLayoutShell({ admin, children }) {
  const pathname = usePathname()

  // If on login or forgot-password route, render full-screen without admin sidebar or topbar
  if (pathname === '/admin/login' || pathname === '/admin/forgot-password') {
    return (
      <div className="admin select-none bg-[#F5F0EB] min-h-screen flex items-center justify-center">
        {children}
      </div>
    )
  }

  return (
    <div className="admin min-h-screen bg-[#F5F0EB] relative overflow-hidden select-none">
      
      {/* Background Ambient Color Wash — use opacity gradients instead of blur-[150px] for GPU perf */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute -bottom-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full transform-gpu"
          style={{ background: 'radial-gradient(circle, rgba(14,79,179,0.04) 0%, rgba(7,151,206,0.005) 60%, transparent 80%)' }}
        />
        <div
          className="absolute -top-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full transform-gpu"
          style={{ background: 'radial-gradient(circle, rgba(232,168,64,0.04) 0%, rgba(237,232,226,0.005) 60%, transparent 80%)' }}
        />
      </div>

      <div className="relative z-10 flex">
        <AdminSidebar admin={admin} />
        <div className="pl-64 flex flex-col min-h-screen w-full">
          <AdminTopbar admin={admin} />
          <main className="flex-1 p-6 lg:p-8 bg-transparent">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
})
