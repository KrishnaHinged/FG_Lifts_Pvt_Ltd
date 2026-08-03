'use client'

import { useState, useEffect, useMemo, useCallback, memo } from 'react'
import { useRouter } from 'next/navigation'
import { Search, LayoutDashboard, Inbox, Boxes, Image, Users, History, X } from 'lucide-react'

const commands = [
  { label: 'Go to Dashboard', href: '/admin/dashboard', icon: LayoutDashboard, category: 'Navigation' },
  { label: 'View Inquiries Pipeline', href: '/admin/inquiries', icon: Inbox, category: 'CRM' },
  { label: 'Manage Products', href: '/admin/products', icon: Boxes, category: 'Content' },
  { label: 'Add New Product', href: '/admin/products/new', icon: Boxes, category: 'Actions' },
  { label: 'Manage Gallery', href: '/admin/gallery', icon: Image, category: 'Content' },
  { label: 'Manage Team Members', href: '/admin/users', icon: Users, category: 'System' },
  { label: 'Audit Logs', href: '/admin/logs', icon: History, category: 'System' },
]

export default memo(function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const router = useRouter()

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      } else if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const filteredCommands = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return commands
    return commands.filter((cmd) =>
      cmd.label.toLowerCase().includes(query) ||
      cmd.category.toLowerCase().includes(query)
    )
  }, [search])

  const handleSelect = useCallback((href) => {
    setIsOpen(false)
    setSearch('')
    router.push(href)
  }, [router])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/60 backdrop-blur-xs select-none">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-[#E8E2DA] overflow-hidden flex flex-col mx-4 animate-in fade-in zoom-in duration-200">
        
        {/* Top Search Header */}
        <div className="flex items-center px-4 border-b border-[#E8E2DA]">
          <Search className="w-5 h-5 text-[#7A7A7A] mr-3 flex-shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Type a command or search (e.g. Products, Inquiries)..."
            className="w-full py-4 text-sm font-sans text-[#111111] placeholder:text-[#7A7A7A] outline-none border-none bg-transparent"
            autoFocus
          />
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 text-[#7A7A7A] hover:text-[#111111] rounded-lg bg-transparent border-none outline-none cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Command List */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-gray-100">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd, idx) => {
              const Icon = cmd.icon
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(cmd.href)}
                  className="w-full flex items-center justify-between px-3 py-3 rounded-xl hover:bg-neutral-50 transition-colors text-left border-none bg-transparent cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0E4FB3]/10 text-[#0E4FB3] flex items-center justify-center">
                      <Icon size={16} />
                    </div>
                    <span className="font-sans text-xs font-semibold text-[#111111]">{cmd.label}</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#7A7A7A] uppercase tracking-wider bg-[#EDE8E2] px-2 py-0.5 rounded">
                    {cmd.category}
                  </span>
                </button>
              )
            })
          ) : (
            <div className="py-8 text-center text-xs font-mono text-[#7A7A7A]">
              No matching commands found.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-[#F9F8F6] border-t border-[#E8E2DA] flex items-center justify-between font-mono text-[10px] text-[#7A7A7A]">
          <span>Tip: Press <kbd className="px-1.5 py-0.5 bg-white border border-[#E8E2DA] rounded text-[#111111]">Cmd + K</kbd> anywhere</span>
          <span>ESC to close</span>
        </div>

      </div>
    </div>
  )
})
