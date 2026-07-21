'use client'

import React from 'react'

export function AdminLayout({
  sidebar,
  children,
  header,
  className = '',
  ...props
}) {
  return (
    <div className={`min-h-screen bg-[#EDE8E2]/50 flex flex-col lg:flex-row ${className}`} {...props}>
      {/* Sidebar Panel */}
      <aside className="w-full lg:w-[280px] bg-[#111111] text-[#F5F0EB] flex-shrink-0 z-40">
        {sidebar}
      </aside>

      {/* Main Panel */}
      <div className="flex-1 flex flex-col min-w-0">
        {header && <header className="bg-white border-b border-[#E8E2DA] h-16 flex-shrink-0">{header}</header>}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
