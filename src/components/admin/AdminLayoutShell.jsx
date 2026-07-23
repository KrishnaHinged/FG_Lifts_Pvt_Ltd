'use client'

import { usePathname } from 'next/navigation'
import AdminSidebar from './AdminSidebar'
import AdminTopbar from './AdminTopbar'

export default function AdminLayoutShell({ admin, children }) {
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
      
      {/* Background Ambient Blur Balls for entire admin area */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -bottom-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-[#0E4FB3]/[0.05] to-[#0797CE]/[0.01] blur-[150px] transform-gpu" />
        <div className="absolute -top-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-[#E8A840]/[0.05] to-[#EDE8E2]/[0.01] blur-[150px] transform-gpu" />
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
}
