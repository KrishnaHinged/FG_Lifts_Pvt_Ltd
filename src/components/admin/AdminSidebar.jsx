'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { hasPermission } from '@/permissions/permissions'
import { PERMISSIONS } from '@/permissions/roles'
import {
  LayoutDashboard,
  Inbox,
  Boxes,
  Image,
  BookOpen,
  Mail,
  FileCode,
  Users,
  History,
  LogOut,
  ArrowLeft
} from 'lucide-react'

const navGroups = [
  {
    title: 'Overview',
    items: [
      { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    ],
  },
  {
    title: 'CRM',
    items: [
      {
        label: 'Inquiries',
        href: '/admin/inquiries',
        icon: Inbox,
        permission: [PERMISSIONS.VIEW_ALL_INQUIRIES, PERMISSIONS.VIEW_OWN_INQUIRIES]
      },
    ],
  },
  {
    title: 'Content CMS',
    items: [
      { label: 'Products', href: '/admin/products', icon: Boxes, permission: [PERMISSIONS.VIEW_PRODUCTS] },
      { label: 'Gallery', href: '/admin/gallery', icon: Image, permission: [PERMISSIONS.VIEW_GALLERY] },
      { label: 'Blog', href: '/admin/blog', icon: BookOpen, permission: [PERMISSIONS.VIEW_BLOG] },
    ],
  },
  {
    title: 'Marketing',
    items: [
      { label: 'Newsletter', href: '/admin/newsletter', icon: Mail, permission: [PERMISSIONS.VIEW_SUBSCRIBERS] },
      { label: 'Email Templates', href: '/admin/email-templates', icon: FileCode, permission: [PERMISSIONS.VIEW_EMAIL_TEMPLATES] },
    ],
  },
  {
    title: 'System',
    items: [
      { label: 'Users', href: '/admin/users', icon: Users, permission: [PERMISSIONS.VIEW_USERS] },
      { label: 'Audit Logs', href: '/admin/logs', icon: History, permission: [PERMISSIONS.VIEW_LOGS] },
    ],
  },
]

export default function AdminSidebar({ admin }) {
  const pathname = usePathname()
  const router = useRouter()
  const role = admin?.role

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/admin/auth/logout', { method: 'POST' })
      if (res.ok) {
        router.push('/admin/login')
      }
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  // Filter groups and items based on permissions
  const filteredGroups = navGroups.map(group => {
    const items = group.items.filter(item => {
      if (!item.permission) return true
      // Check if user has at least one of the required permissions
      return item.permission.some(perm => hasPermission({ role }, perm))
    })
    return { ...group, items }
  }).filter(group => group.items.length > 0)

  // Color mapping for role badges
  const getBadgeColor = (r) => {
    switch (r) {
      case 'SUPER_ADMIN': return 'bg-blue-600 text-white'
      case 'SALES_MANAGER': return 'bg-emerald-600 text-white'
      case 'SALES_EXECUTIVE': return 'bg-amber-600 text-white'
      case 'MARKETING_MANAGER': return 'bg-purple-600 text-white'
      case 'CONTENT_EDITOR': return 'bg-gray-600 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  return (
    <aside className="w-64 bg-[#111827] text-gray-300 flex flex-col h-screen select-none border-r border-gray-800">
      
      {/* Top Header */}
      <div className="h-16 flex items-center px-6 border-b border-gray-800 gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-fg-blue flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" className="w-4.5 h-4.5 stroke-white">
            <rect x="4" y="2" width="16" height="20" rx="3" />
            <path d="M9 12L12 8L15 12" />
            <path d="M12 8V16" />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="font-display text-white font-semibold text-base leading-tight">FG Lift</span>
          <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest leading-none">ADMIN PANEL</span>
        </div>
      </div>

      {/* Nav Menu */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 no-scrollbar">
        {filteredGroups.map(group => (
          <div key={group.title} className="space-y-1.5">
            <h4 className="px-3 font-mono text-[9px] font-bold uppercase tracking-widest text-gray-500">
              {group.title}
            </h4>
            <div className="space-y-0.5">
              {group.items.map(item => {
                const Icon = item.icon
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium no-underline transition-colors duration-200 ${
                      isActive
                        ? 'bg-white/10 text-white font-semibold'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}

        {/* Back to site link */}
        <div className="pt-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-gray-400 hover:text-white hover:bg-white/5 no-underline transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Public Site
          </Link>
        </div>
      </div>

      {/* User Footer Profile */}
      {admin && (
        <div className="p-4 border-t border-gray-800 bg-gray-900/50 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-fg-blue flex items-center justify-center text-white text-xs font-bold font-sans">
              {admin.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-white text-xs font-semibold truncate leading-tight">{admin.name}</span>
              <span className="text-[10px] text-gray-400 truncate leading-none mt-0.5">{admin.email}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-1">
            <span className={`font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded font-bold ${getBadgeColor(role)}`}>
              {role?.replace('_', ' ')}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-[10px] font-medium text-gray-500 hover:text-white cursor-pointer bg-transparent border-none p-0 outline-none transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </div>
      )}

    </aside>
  )
}
