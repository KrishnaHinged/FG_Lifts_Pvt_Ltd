'use client'

import { useState, useEffect } from 'react'
import { Download, RefreshCw, Mail, Users, CheckCircle, XCircle } from 'lucide-react'
import StatCard from '@/components/admin/StatCard'
import FilterPillBar from '@/components/FilterPillBar'
import SubscriberTable from '@/components/admin/SubscriberTable'
import { hasPermission } from '@/permissions/permissions'
import { PERMISSIONS } from '@/permissions/roles'
import ConfirmModal from '@/components/admin/ConfirmModal'

// Design System Components
import PageHeader from '@/components/composition/PageHeader'
import SearchBar from '@/components/forms/SearchBar'

export default function NewsletterClient({ initialSubscribers = [], total = 0, stats: initialStats, currentAdmin }) {
  const [subscribers, setSubscribers] = useState(initialSubscribers)
  const [stats, setStats] = useState(initialStats)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(Math.ceil(total / 50))
  const [loading, setLoading] = useState(false)
  const [unsubscribeEmail, setUnsubscribeEmail] = useState(null)

  const itemsPerPage = 50

  const fetchData = async (page = 1, searchQuery = '', statusVal = 'All') => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/newsletter?page=${page}&limit=${itemsPerPage}&search=${encodeURIComponent(searchQuery)}&status=${statusVal}`)
      const data = await res.json()
      if (data.success && data.subscribers) {
        setSubscribers(data.subscribers)
        setTotalPages(data.pages || 1)
        if (data.stats) {
          setStats(data.stats)
        }
      }
    } catch {
      console.error('Failed to fetch subscribers data')
    } finally {
      setLoading(false)
    }
  }

  // Reload lists when filter criteria shift
  useEffect(() => {
    fetchData(currentPage, search, statusFilter)
  }, [currentPage, statusFilter])

  // Handle live search with debounce or button action
  const handleSearchSubmit = (e) => {
    e?.preventDefault()
    setCurrentPage(1)
    fetchData(1, search, statusFilter)
  }

  const handleDeactivate = (email) => {
    setUnsubscribeEmail(email)
  }

  const handleUnsubscribeConfirm = async () => {
    const email = unsubscribeEmail
    setUnsubscribeEmail(null)
    if (!email) return

    try {
      const res = await fetch('/api/newsletter', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        fetchData(currentPage, search, statusFilter)
      } else {
        alert(data.error || 'Failed to unsubscribe reader')
      }
    } catch {
      alert('Network error')
    }
  }

  const handleReactivate = async (email) => {
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'Admin Reactivated' })
      })
      if (res.ok) {
        fetchData(currentPage, search, statusFilter)
      }
    } catch (err) {
      console.error('Reactivate error:', err)
    }
  }

  const handleExport = () => {
    window.location.href = '/api/admin/newsletter?export=true'
  }

  const canExport = hasPermission(currentAdmin, PERMISSIONS.EXPORT_SUBSCRIBERS)

  return (
    <div className="space-y-6 select-none">
      
      {/* Top Header */}
      <PageHeader
        title="Newsletter"
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => fetchData(currentPage, search, statusFilter)}
              disabled={loading}
              className="p-2 border border-[#E8E2DA] hover:border-[#111111] rounded-xl bg-white hover:bg-neutral-50 cursor-pointer disabled:opacity-50 outline-none transition-all flex items-center justify-center"
              title="Refresh List"
            >
              <RefreshCw className={`w-4 h-4 text-[#7A7A7A] ${loading ? 'animate-spin' : ''}`} />
            </button>
            {canExport && (
              <button
                onClick={handleExport}
                className="inline-flex items-center gap-1.5 bg-white border border-[#E8E2DA] hover:bg-neutral-50 text-[#111111] font-sans text-xs font-semibold px-4 py-2.5 rounded-xl cursor-pointer shadow-xs hover:shadow-md transition-all outline-none"
              >
                <Download className="w-4 h-4 text-[#7A7A7A]" />
                Export CSV
              </button>
            )}
          </div>
        }
      />

      {/* Top Stat Row Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard title="Total Contacts" value={stats.total} iconName="users" color="blue" />
        <StatCard title="Active Subscriptions" value={stats.active} iconName="checkCircle" color="green" />
        <StatCard title="Unsubscribed Out" value={stats.unsubscribed} iconName="xCircle" color="red" />
      </div>

      {/* Filters Search & Options row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 justify-between bg-white border border-[#E8E2DA] rounded-2xl p-4 shadow-xs">
        <form onSubmit={handleSearchSubmit} className="max-w-sm flex-1">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by subscriber email..."
          />
        </form>
        <div className="flex-shrink-0 max-w-[320px]">
          <FilterPillBar
            options={['All', 'Active', 'Unsubscribed']}
            active={statusFilter}
            onChange={(val) => { setStatusFilter(val); setCurrentPage(1) }}
          />
        </div>
      </div>

      {/* Subscribers Table listing */}
      <SubscriberTable
        subscribers={subscribers}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onDeactivate={handleDeactivate}
        onReactivate={handleReactivate}
        currentAdmin={currentAdmin}
      />

      {/* Unsubscribe Confirmation Modal */}
      <ConfirmModal
        isOpen={!!unsubscribeEmail}
        title="Unsubscribe Reader"
        description="Are you sure you want to unsubscribe this reader from the newsletter mailing list? They will no longer receive periodic updates."
        confirmLabel="Unsubscribe"
        onConfirm={handleUnsubscribeConfirm}
        onCancel={() => setUnsubscribeEmail(null)}
      />

    </div>
  )
}
