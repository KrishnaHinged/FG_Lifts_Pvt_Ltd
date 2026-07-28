'use client'

import { useState, useMemo, useCallback, memo } from 'react'
import { Eye, RefreshCw, Trash2, Search } from 'lucide-react'
import { hasPermission } from '@/permissions/permissions'
import { PERMISSIONS } from '@/permissions/roles'
import ConfirmModal from './ConfirmModal'
import { useDebouncedValue } from '@/hooks/useDebounce'

const getStatusBadge = (status) => {
  switch (status) {
    case 'New': return 'bg-blue-50 text-blue-700 border-blue-100'
    case 'Contacted': return 'bg-amber-50 text-amber-700 border-amber-100'
    case 'Qualified': return 'bg-emerald-50 text-emerald-700 border-emerald-100'
    case 'Closed': return 'bg-gray-50 text-gray-600 border-gray-200'
    case 'Rejected': return 'bg-red-50 text-red-700 border-red-100'
    default: return 'bg-gray-50 text-gray-500'
  }
}

const InquiryTableRow = memo(function InquiryTableRow({
  inquiry,
  currentAdmin,
  isUpdating,
  statusMenuId,
  setStatusMenuId,
  handleStatusChange,
  onCardClick,
  setDeleteInquiryId
}) {
  const referenceId = inquiry._id.toString().slice(-6).toUpperCase()
  const formattedDate = new Date(inquiry.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })

  return (
    <tr className={isUpdating ? 'opacity-50 pointer-events-none' : ''}>
      <td className="px-6 py-4 font-mono text-xs text-gray-400 font-bold">{referenceId}</td>
      <td className="px-6 py-4 font-semibold text-gray-900">{inquiry.name}</td>
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span>{inquiry.company || 'Private Project'}</span>
          <span className="text-xs text-gray-400">{inquiry.city || 'unverified'}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-col text-xs text-gray-500">
          <span>{inquiry.email}</span>
          <span>{inquiry.phone}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="bg-gray-100 text-gray-600 font-mono text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded border border-gray-200">
          {inquiry.elevatorType || 'Universal'}
        </span>
      </td>
      <td className="px-6 py-4 relative">
        <span className={`inline-block font-sans text-xs px-2.5 py-1 rounded-full font-bold border ${getStatusBadge(inquiry.status)}`}>
          {inquiry.status}
        </span>
      </td>
      <td className="px-6 py-4 text-xs font-semibold text-gray-500">
        {inquiry.assignedTo ? inquiry.assignedTo.name : 'Unassigned'}
      </td>
      <td className="px-6 py-4 text-xs text-gray-400 font-mono">
        {formattedDate}
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-2 relative">
          <button
            onClick={() => onCardClick(inquiry)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-fg-blue hover:bg-gray-50 cursor-pointer bg-transparent border-none outline-none"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>

          {hasPermission(currentAdmin, PERMISSIONS.UPDATE_INQUIRY_STATUS) && (
            <div className="relative">
              <button
                onClick={() => setStatusMenuId(statusMenuId === inquiry._id ? null : inquiry._id)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-amber-600 hover:bg-gray-50 cursor-pointer bg-transparent border-none outline-none"
                title="Update Status"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              {statusMenuId === inquiry._id && (
                <div className="absolute right-0 top-full mt-1 z-30 w-36 bg-white border border-gray-200 rounded-xl shadow-lg p-1 flex flex-col">
                  {['New', 'Contacted', 'Qualified', 'Closed', 'Rejected'].map(s => (
                    <button
                      key={s}
                      onClick={() => handleStatusChange(inquiry._id, s)}
                      className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-sans text-gray-700 hover:bg-gray-50 cursor-pointer bg-transparent border-none"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {hasPermission(currentAdmin, PERMISSIONS.DELETE_INQUIRY) && (
            <button
              onClick={() => setDeleteInquiryId(inquiry._id)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-gray-50 cursor-pointer bg-transparent border-none outline-none"
              title="Delete Inquiry"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </td>
    </tr>
  )
})

export default function InquiriesTable({
  inquiries = [],
  admins = [],
  currentAdmin,
  onUpdate,
  onCardClick
}) {
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const [deleteInquiryId, setDeleteInquiryId] = useState(null)
  const [updatingId, setUpdatingId] = useState(null)
  const [statusMenuId, setStatusMenuId] = useState(null)
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState('desc')
  const [optimisticOverrides, setOptimisticOverrides] = useState({})

  const debouncedSearch = useDebouncedValue(search, 300)

  const toggleSort = useCallback((field) => {
    setSortBy(prevSort => {
      if (prevSort === field) {
        setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')
        return field
      }
      setSortOrder('asc')
      return field
    })
    setCurrentPage(1)
  }, [])

  const handleStatusChange = useCallback(async (id, newStatus) => {
    setStatusMenuId(null)
    setUpdatingId(id)
    setOptimisticOverrides(prev => ({ ...prev, [id]: newStatus }))

    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      })
      const data = await res.json()
      if (data.success) {
        onUpdate()
      } else {
        setOptimisticOverrides(prev => {
          const next = { ...prev }
          delete next[id]
          return next
        })
        alert(data.error || 'Failed to update status')
      }
    } catch {
      setOptimisticOverrides(prev => {
        const next = { ...prev }
        delete next[id]
        return next
      })
      alert('Network error')
    } finally {
      setUpdatingId(null)
    }
  }, [onUpdate])

  const handleDelete = useCallback(async () => {
    const id = deleteInquiryId
    setDeleteInquiryId(null)
    if (!id) return

    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        onUpdate()
      } else {
        alert(data.error || 'Failed to delete inquiry')
      }
    } catch {
      alert('Network error')
    }
  }, [deleteInquiryId, onUpdate])

  const effectiveInquiries = useMemo(() => {
    return inquiries.map(i => {
      if (optimisticOverrides[i._id]) {
        return { ...i, status: optimisticOverrides[i._id] }
      }
      return i
    })
  }, [inquiries, optimisticOverrides])

  const filtered = useMemo(() => {
    const term = debouncedSearch.toLowerCase()
    if (!term) return effectiveInquiries
    return effectiveInquiries.filter(i => (
      i.name.toLowerCase().includes(term) ||
      i.email.toLowerCase().includes(term) ||
      (i.company && i.company.toLowerCase().includes(term))
    ))
  }, [effectiveInquiries, debouncedSearch])

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      let comparison = 0
      if (sortBy === 'date') {
        comparison = new Date(a.createdAt) - new Date(b.createdAt)
      } else if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name)
      } else if (sortBy === 'status') {
        comparison = a.status.localeCompare(b.status)
      }
      return sortOrder === 'desc' ? -comparison : comparison
    })
  }, [filtered, sortBy, sortOrder])

  const totalPages = Math.max(1, Math.ceil(sorted.length / itemsPerPage))
  const paginated = useMemo(() => {
    return sorted.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  }, [sorted, currentPage, itemsPerPage])

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-2.5 max-w-md shadow-xs focus-within:border-fg-blue transition-colors">
        <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setCurrentPage(1) }}
          placeholder="Search by client name, email, or company..."
          className="flex-1 font-sans text-sm text-gray-900 placeholder:text-gray-400 outline-none border-none"
          aria-label="Search inquiries"
        />
        {search !== debouncedSearch && (
          <RefreshCw className="w-4 h-4 text-fg-blue animate-spin" />
        )}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse" role="table">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 font-mono text-[10px] font-bold uppercase tracking-wider text-gray-400 select-none">
                <th className="px-6 py-4" scope="col">#</th>
                <th className="px-6 py-4 cursor-pointer hover:text-gray-900" scope="col" onClick={() => toggleSort('name')}>
                  Client Name {sortBy === 'name' ? (sortOrder === 'asc' ? ' ▲' : ' ▼') : ''}
                </th>
                <th className="px-6 py-4" scope="col">Company & City</th>
                <th className="px-6 py-4" scope="col">Contact</th>
                <th className="px-6 py-4" scope="col">Elevator Type</th>
                <th className="px-6 py-4 cursor-pointer hover:text-gray-900" scope="col" onClick={() => toggleSort('status')}>
                  Status {sortBy === 'status' ? (sortOrder === 'asc' ? ' ▲' : ' ▼') : ''}
                </th>
                <th className="px-6 py-4" scope="col">Assigned To</th>
                <th className="px-6 py-4 cursor-pointer hover:text-gray-900" scope="col" onClick={() => toggleSort('date')}>
                  Date {sortBy === 'date' ? (sortOrder === 'asc' ? ' ▲' : ' ▼') : ''}
                </th>
                <th className="px-6 py-4 text-right" scope="col">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 font-sans text-sm text-gray-700">
              {paginated.map((inquiry) => (
                <InquiryTableRow
                  key={inquiry._id}
                  inquiry={inquiry}
                  currentAdmin={currentAdmin}
                  isUpdating={updatingId === inquiry._id}
                  statusMenuId={statusMenuId}
                  setStatusMenuId={setStatusMenuId}
                  handleStatusChange={handleStatusChange}
                  onCardClick={onCardClick}
                  setDeleteInquiryId={setDeleteInquiryId}
                />
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center py-12 text-gray-400 font-mono text-xs uppercase tracking-wider">
                    No inquiries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <span className="font-mono text-xs text-gray-400">
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-gray-400">Rows per page:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value))
                    setCurrentPage(1)
                  }}
                  className="px-2 py-1 rounded border border-gray-200 bg-white font-sans text-xs outline-none focus-visible:ring-2 focus-visible:ring-[#0E4FB3]"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="px-3.5 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 font-sans text-xs font-semibold cursor-pointer disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E4FB3] focus-visible:ring-offset-2"
              >
                Previous
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="px-3.5 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 font-sans text-xs font-semibold cursor-pointer disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E4FB3] focus-visible:ring-offset-2"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={!!deleteInquiryId}
        title="Delete Inquiry"
        description="Are you sure you want to permanently delete this lead? This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteInquiryId(null)}
      />
    </div>
  )
}
