'use client'

import { useState, useEffect } from 'react'
import { History, RefreshCw, Filter, ShieldAlert } from 'lucide-react'
import AuditLogTable from '@/components/admin/AuditLogTable'
import { useDebouncedValue } from '@/hooks/useDebounce'

// Design System Components
import PageHeader from '@/components/composition/PageHeader'
import SearchBar from '@/components/forms/SearchBar'

const actionTypes = [
  { value: '', label: 'All Operations' },
  { value: 'login_success', label: 'Login Success' },
  { value: 'login_failed', label: 'Login Failures' },
  { value: 'inquiry_created', label: 'Inquiry Created' },
  { value: 'inquiry_assigned', label: 'Lead Assigned' },
  { value: 'inquiry_status_changed', label: 'Status Updates' },
  { value: 'inquiry_note_added', label: 'Notes Added' },
  { value: 'inquiry_deleted', label: 'Leads Deleted' },
  { value: 'product_created', label: 'Product Created' },
  { value: 'product_updated', label: 'Product Updated' },
  { value: 'product_deleted', label: 'Product Deleted' },
  { value: 'gallery_created', label: 'Gallery Created' },
  { value: 'gallery_updated', label: 'Gallery Updated' },
  { value: 'gallery_deleted', label: 'Gallery Deleted' },
  { value: 'blog_created', label: 'Blog Created' },
  { value: 'blog_published', label: 'Blog Published' },
  { value: 'blog_deleted', label: 'Blog Deleted' },
  { value: 'subscriber_created', label: 'Contact Captured' },
  { value: 'subscriber_deactivated', label: 'Subscribers Deactivated' },
  { value: 'subscriber_exported', label: 'CRM CSV Exports' },
  { value: 'user_created', label: 'User Provisioned' },
  { value: 'user_deactivated', label: 'User Suspended' },
  { value: 'template_updated', label: 'Template Edited' },
]

export default function LogsClient({ initialLogs = [], total = 0, admins = [] }) {
  const [logs, setLogs] = useState(initialLogs)
  const [actionFilter, setActionFilter] = useState('')
  const [adminFilter, setAdminFilter] = useState('')
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(50)
  const [totalPages, setTotalPages] = useState(Math.ceil(total / 50))
  const [loading, setLoading] = useState(false)

  const debouncedSearch = useDebouncedValue(search, 300)

  const fetchLogs = async (page = 1, limit = 50, actionVal = '', adminVal = '') => {
    setLoading(true)
    try {
      let query = `/api/admin/logs?page=${page}&limit=${limit}`
      if (actionVal) query += `&action=${actionVal}`
      if (adminVal) query += `&adminId=${adminVal}`

      const res = await fetch(query)
      const data = await res.json()
      if (data.success && data.logs) {
        setLogs(data.logs)
        setTotalPages(data.pages || 1)
      }
    } catch {
      console.error('Failed to reload logs history')
    } finally {
      setLoading(false)
    }
  }

  // Fetch log list when filters or pages shift
  useEffect(() => {
    setTimeout(() => {
      fetchLogs(currentPage, itemsPerPage, actionFilter, adminFilter)
    }, 0)
  }, [currentPage, itemsPerPage, actionFilter, adminFilter])

  const filteredLogs = logs.filter(log => {
    const term = debouncedSearch.toLowerCase()
    return (
      log.action.toLowerCase().includes(term) ||
      (log.performedBy?.name && log.performedBy.name.toLowerCase().includes(term)) ||
      (log.targetType && log.targetType.toLowerCase().includes(term)) ||
      (log.targetId && log.targetId.toLowerCase().includes(term))
    )
  })

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <PageHeader
        title="Audit Logs"
        subtitle="Immutable History log"
        actions={
          <button
            onClick={() => fetchLogs(currentPage, itemsPerPage, actionFilter, adminFilter)}
            disabled={loading}
            className="p-2 border border-[#E8E2DA] hover:border-[#111111] rounded-xl bg-white hover:bg-neutral-50 cursor-pointer disabled:opacity-50 outline-none transition-all flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#0E4FB3] focus-visible:ring-offset-2"
            title="Refresh Feed"
            aria-label="Refresh Feed"
          >
            <RefreshCw className={`w-4 h-4 text-[#7A7A7A] ${loading ? 'animate-spin' : ''}`} />
          </button>
        }
      />

      {/* Search & Filters block */}
      <div className="flex flex-col gap-4 bg-white border border-[#E8E2DA] rounded-2xl p-4 shadow-xs">
        
        {/* Search Input */}
        <div className="max-w-md w-full">
          <SearchBar
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1) }}
            placeholder="Search logs by IP, operator, target ID..."
          />
        </div>

        {/* Dropdown Filters Row */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
          <div className="flex-1 w-full flex flex-col gap-1">
            <label className="font-mono text-[9px] uppercase tracking-wider text-[#7A7A7A] font-bold mb-1">Filter by Operations</label>
            <select
              value={actionFilter}
              onChange={(e) => { setActionFilter(e.target.value); setCurrentPage(1) }}
              className="px-3.5 py-2.5 rounded-xl border border-[#E8E2DA] bg-white font-sans text-xs outline-none focus:border-[#0E4FB3] w-full focus-visible:ring-2 focus-visible:ring-[#0E4FB3]"
            >
              {actionTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          <div className="flex-1 w-full flex flex-col gap-1">
            <label className="font-mono text-[9px] uppercase tracking-wider text-[#7A7A7A] font-bold mb-1">Filter by Operator Name</label>
            <select
              value={adminFilter}
              onChange={(e) => { setAdminFilter(e.target.value); setCurrentPage(1) }}
              className="px-3.5 py-2.5 rounded-xl border border-[#E8E2DA] bg-white font-sans text-xs outline-none focus:border-[#0E4FB3] w-full focus-visible:ring-2 focus-visible:ring-[#0E4FB3]"
            >
              <option value="">All Team Operators</option>
              {admins.map(adm => (
                <option key={adm._id} value={adm._id}>{adm.name} ({adm.role?.replace('_', ' ')})</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <AuditLogTable
        logs={filteredLogs}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
        onLimitChange={(lim) => {
          setItemsPerPage(lim)
          setCurrentPage(1)
        }}
      />

    </div>
  )
}
