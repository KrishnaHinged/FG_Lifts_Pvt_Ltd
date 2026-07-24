'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { hasPermission } from '@/permissions/permissions'
import { PERMISSIONS } from '@/permissions/roles'
import {
  LayoutDashboard,
  Inbox,
  Boxes,
  Image as ImageIcon,
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
      { label: 'Gallery', href: '/admin/gallery', icon: ImageIcon, permission: [PERMISSIONS.VIEW_GALLERY] },
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
      await fetch('/api/admin/auth/logout', { method: 'POST' })
      window.location.href = '/admin/login'
    } catch (err) {
      console.error('Logout error:', err)
      window.location.href = '/admin/login'
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
    <aside className="fixed top-0 left-0 bottom-0 w-64 bg-[#EDE8E2]/60 backdrop-blur-xl text-neutral-800 flex flex-col h-screen select-none border-r border-[#E8E2DA] z-40">
      
      {/* Top Header */}
      <div className="h-16 flex items-center px-6 border-b border-[#E8E2DA] gap-3">
        <div className="bg-white px-2.5 py-1.5 rounded shadow-xs flex items-center justify-center border border-neutral-200">
          <Image 
            src="/images/logo.png" 
            alt="FG Lifts Logo" 
            width={110} 
            height={26} 
            className="object-contain h-[22px] w-auto"
          />
        </div>
      </div>

      {/* Nav Menu */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 no-scrollbar">
        {filteredGroups.map(group => (
          <div key={group.title} className="space-y-1.5">
            <h4 className="px-3 font-mono text-[9px] font-bold uppercase tracking-widest text-neutral-400">
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
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold no-underline transition-all duration-200 ${
                      isActive
                        ? 'bg-white text-[#0E4FB3] shadow-xs'
                        : 'text-neutral-500 hover:text-neutral-900 hover:bg-white/40'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#0E4FB3]' : 'text-neutral-400'}`} />
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
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-neutral-500 hover:text-neutral-900 hover:bg-white/40 no-underline transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Public Site
          </Link>
        </div>
      </div>

      {/* User Footer Profile */}
      {admin && (
        <div className="p-4 border-t border-[#E8E2DA] bg-white/20 backdrop-blur-md flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#0E4FB3] flex items-center justify-center text-white text-xs font-bold font-sans">
              {admin.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-neutral-900 text-xs font-bold truncate leading-tight">{admin.name}</span>
              <span className="text-[10px] text-neutral-400 truncate leading-none mt-0.5">{admin.email}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-1">
            <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md font-bold bg-[#E8F0FC] text-[#0E4FB3]">
              {role?.replace('_', ' ')}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-[10px] font-bold text-neutral-400 hover:text-[#0E4FB3] cursor-pointer bg-transparent border-none p-0 outline-hidden transition-colors"
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
