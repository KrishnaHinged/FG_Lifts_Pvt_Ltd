'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2, Search, Quote } from 'lucide-react'
import ConfirmModal from '@/components/admin/ConfirmModal'
import { hasPermission } from '@/permissions/permissions'
import { PERMISSIONS } from '@/permissions/roles'

// Design System Components
import PageHeader from '@/components/composition/PageHeader'
import SearchBar from '@/components/forms/SearchBar'
import Table from '@/components/composition/Table'
import Badge from '@/components/ui/Badge'

export default function TestimonialsClient({ initialTestimonials = [], currentAdmin }) {
  const [testimonials, setTestimonials] = useState(initialTestimonials)
  const [search, setSearch] = useState('')
  const [deleteId, setDeleteId] = useState(null)
  const [togglingId, setTogglingId] = useState(null)

  const handleToggleActive = async (id, currentVal) => {
    setTogglingId(id)
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentVal }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setTestimonials(testimonials.map(t => t.id === id ? { ...t, isActive: !currentVal } : t))
      } else {
        alert(data.error || 'Failed to update visibility')
      }
    } catch {
      alert('Network error')
    } finally {
      setTogglingId(null)
    }
  }

  const handleDelete = async () => {
    const id = deleteId
    setDeleteId(null)
    if (!id) return

    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (res.ok && data.success) {
        setTestimonials(testimonials.filter(t => t.id !== id))
      } else {
        alert(data.error || 'Failed to delete testimonial')
      }
    } catch {
      alert('Network error')
    }
  }

  const filtered = testimonials.filter(t => {
    const term = search.toLowerCase()
    return t.name.toLowerCase().includes(term) || t.quote.toLowerCase().includes(term) || t.title.toLowerCase().includes(term)
  })

  const canCreate = hasPermission(currentAdmin, PERMISSIONS.CREATE_TESTIMONIAL)
  const canEdit = hasPermission(currentAdmin, PERMISSIONS.EDIT_TESTIMONIAL)
  const canDelete = hasPermission(currentAdmin, PERMISSIONS.DELETE_TESTIMONIAL)

  const getStyleLabel = (bgColor) => {
    if (bgColor.includes('#1A1A1A')) return 'Luxury Dark'
    if (bgColor.includes('#0E4FB3')) return 'Brand Blue'
    if (bgColor.includes('#0797CE')) return 'Vibrant Light Blue'
    if (bgColor.includes('#E8A840')) return 'Enterprise Gold'
    return 'Default Dark'
  }

  const getStyleColorClass = (bgColor) => {
    if (bgColor.includes('#1A1A1A')) return 'neutral'
    if (bgColor.includes('#0E4FB3')) return 'primary'
    if (bgColor.includes('#0797CE')) return 'success'
    if (bgColor.includes('#E8A840')) return 'warning'
    return 'neutral'
  }

  return (
    <div className="space-y-6 select-none">
      
      {/* Top Header */}
      <PageHeader
        title="Client Testimonials"
        actions={
          canCreate && (
            <Link
              href="/admin/testimonials/new"
              className="inline-flex items-center justify-center font-sans font-bold uppercase tracking-wider transition-all duration-300 bg-[#0E4FB3] text-white hover:bg-[#0b3c8a] active:bg-[#082a63] px-6 py-3 text-[11px] rounded-full no-underline"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Testimonial
            </Link>
          )
        }
      />

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 justify-between bg-white border border-[#E8E2DA] rounded-2xl p-4 shadow-sm">
        <div className="w-full sm:max-w-md">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by client name, designation, or quote..."
          />
        </div>
      </div>

      {/* Testimonials Table */}
      <Table>
        <thead>
          <tr className="bg-[#EDE8E2]/50 border-b border-[#E8E2DA]">
            <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-[#7A7A7A] font-bold" scope="col">Avatar</th>
            <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-[#7A7A7A] font-bold" scope="col">Client details</th>
            <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-[#7A7A7A] font-bold" scope="col">Testimonial Quote</th>
            <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-[#7A7A7A] font-bold" scope="col">Card Theme</th>
            <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-[#7A7A7A] font-bold" scope="col">Sort Order</th>
            <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-[#7A7A7A] font-bold" scope="col">Status</th>
            <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-[#7A7A7A] font-bold text-right" scope="col">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E8E2DA]">
          {filtered.map((t) => {
            const isToggling = togglingId === t.id
            const initials = t.name ? t.name.trim().split(/\s+/).map(n => n[0]).join('').substring(0,2).toUpperCase() : 'RP'
            return (
              <tr key={t.id} className={`hover:bg-neutral-50/50 transition-colors ${isToggling ? 'opacity-50 pointer-events-none' : ''}`}>
                {/* Avatar Initials badge */}
                <td className="px-6 py-4">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-[11px] font-bold shadow-xs bg-slate-900 text-white`}>
                    {initials}
                  </div>
                </td>
                
                {/* Name & Title */}
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-semibold text-[#111111]">{t.name}</span>
                    <span className="text-[10px] text-[#7A7A7A] font-mono leading-tight">{t.title}</span>
                  </div>
                </td>
                
                {/* Quote (Truncated) */}
                <td className="px-6 py-4 max-w-xs md:max-w-sm truncate text-xs text-[#555555] font-sans">
                  <Quote className="w-3.5 h-3.5 inline mr-1 text-[#0E4FB3]/40 align-text-top" />
                  {t.quote}
                </td>
                
                {/* Card Theme */}
                <td className="px-6 py-4">
                  <Badge variant={getStyleColorClass(t.bgColor)}>
                    {getStyleLabel(t.bgColor)}
                  </Badge>
                </td>
                
                {/* Sort Order */}
                <td className="px-6 py-4 text-xs font-mono font-bold text-neutral-600">
                  {t.sortOrder}
                </td>

                {/* Status Checkbox Button */}
                <td className="px-6 py-4">
                  {canEdit ? (
                    <button
                      onClick={() => handleToggleActive(t.id, t.isActive)}
                      disabled={isToggling}
                      className="cursor-pointer border-none bg-transparent p-0 m-0 outline-none"
                    >
                      <Badge variant={t.isActive ? 'success' : 'neutral'}>
                        {t.isActive ? 'Active' : 'Draft'}
                      </Badge>
                    </button>
                  ) : (
                    <Badge variant={t.isActive ? 'success' : 'neutral'}>
                      {t.isActive ? 'Active' : 'Draft'}
                    </Badge>
                  )}
                </td>
                
                {/* Actions */}
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {canEdit && (
                      <Link
                        href={`/admin/testimonials/${t.id}/edit`}
                        className="inline-flex items-center justify-center p-2 min-w-0 rounded-full border border-[#E8E2DA] bg-transparent text-[#111111] hover:border-[#111111] hover:bg-neutral-50 transition-all cursor-pointer outline-none"
                        title="Edit details"
                      >
                        <Edit size={14} />
                      </Link>
                    )}
                    {canDelete && (
                      <button
                        onClick={() => setDeleteId(t.id)}
                        className="inline-flex items-center justify-center p-2 min-w-0 rounded-full border border-red-200 bg-red-50 text-red-700 hover:bg-[#b81d2d] hover:text-white transition-all cursor-pointer outline-none"
                        title="Delete testimonial"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            )
          })}
          {filtered.length === 0 && (
            <tr>
              <td colSpan="7" className="px-6 py-12 text-center text-sm text-[#7A7A7A] font-sans">
                No testimonials found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Delete Prompt Modal */}
      <ConfirmModal
        isOpen={!!deleteId}
        title="Delete Testimonial"
        message="Are you sure you want to permanently delete this testimonial? This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onClose={() => setDeleteId(null)}
      />

    </div>
  )
}
