'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2, Search, CheckCircle, XCircle } from 'lucide-react'
import FilterPillBar from '@/components/FilterPillBar'
import ConfirmModal from '@/components/admin/ConfirmModal'
import { hasPermission } from '@/permissions/permissions'
import { PERMISSIONS } from '@/permissions/roles'

// Design System Components
import PageHeader from '@/components/composition/PageHeader'
import SearchBar from '@/components/forms/SearchBar'
import Table from '@/components/composition/Table'
import Badge from '@/components/ui/Badge'
import PrimaryButton from '@/components/ui/button/PrimaryButton'
import IconButton from '@/components/ui/button/IconButton'

const categories = ['All', 'Residential', 'Commercial', 'Industrial', 'Luxury', 'Hospitality']

export default function GalleryClient({ initialProjects = [], currentAdmin }) {
  const [projects, setProjects] = useState(initialProjects)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [deleteId, setDeleteId] = useState(null)
  const [togglingId, setTogglingId] = useState(null)

  const handleToggleActive = async (id, currentVal) => {
    setTogglingId(id)
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentVal }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setProjects(projects.map(p => p._id === id ? { ...p, isActive: !currentVal } : p))
      } else {
        // Fallback refresh
        setProjects(projects.map(p => p._id === id ? { ...p, isActive: !currentVal } : p))
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
      const res = await fetch(`/api/admin/gallery/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (res.ok && data.success) {
        setProjects(projects.filter(p => p._id !== id))
      } else {
        alert(data.error || 'Failed to delete project')
      }
    } catch {
      alert('Network error')
    }
  }

  // Filter projects client-side
  const filtered = projects.filter(p => {
    const term = search.toLowerCase()
    const matchesSearch = p.title.toLowerCase().includes(term) || p.slug.toLowerCase().includes(term) || p.location.toLowerCase().includes(term)
    const matchesCategory = activeCategory === 'All' || p.clientType === activeCategory
    return matchesSearch && matchesCategory
  })

  const canCreate = hasPermission(currentAdmin, PERMISSIONS.CREATE_GALLERY)
  const canEdit = hasPermission(currentAdmin, PERMISSIONS.EDIT_GALLERY)
  const canDelete = hasPermission(currentAdmin, PERMISSIONS.DELETE_GALLERY)

  return (
    <div className="space-y-6 select-none">
      
      {/* Top Header */}
      <PageHeader
        title="Gallery"
        actions={
          canCreate && (
            <Link
              href="/admin/gallery/new"
              className="inline-flex items-center justify-center font-sans font-bold uppercase tracking-wider transition-all duration-300 bg-[#0E4FB3] text-white hover:bg-[#0b3c8a] active:bg-[#082a63] px-6 py-3 text-[11px] rounded-full no-underline"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Landmark Project
            </Link>
          )
        }
      />

      {/* Search & Category Pills bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 justify-between bg-white border border-[#E8E2DA] rounded-2xl p-4 shadow-sm">
        <div className="w-full sm:max-w-sm">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by landmark title, state or slug..."
          />
        </div>
        <div className="flex-shrink-0">
          <FilterPillBar
            options={categories}
            active={activeCategory}
            onChange={setActiveCategory}
          />
        </div>
      </div>

      {/* Showcase Table */}
      <Table>
        <thead>
          <tr className="bg-[#EDE8E2]/50 border-b border-[#E8E2DA]">
            <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-[#7A7A7A] font-bold" scope="col">Image</th>
            <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-[#7A7A7A] font-bold" scope="col">Landmark Title</th>
            <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-[#7A7A7A] font-bold" scope="col">Location</th>
            <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-[#7A7A7A] font-bold" scope="col">Sector type</th>
            <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-[#7A7A7A] font-bold" scope="col">Status</th>
            <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-[#7A7A7A] font-bold" scope="col">Completion Year</th>
            <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-[#7A7A7A] font-bold text-right" scope="col">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E8E2DA]">
          {filtered.map((proj) => {
            const isToggling = togglingId === proj._id
            return (
              <tr key={proj._id} className={`hover:bg-neutral-50/50 transition-colors ${isToggling ? 'opacity-50 pointer-events-none' : ''}`}>
                <td className="px-6 py-4">
                  <div className="w-12 h-9 relative border border-[#E8E2DA] rounded bg-gray-50 overflow-hidden">
                    <img
                      src={proj.images?.[0]?.url || '/images/projects-collage.png'}
                      alt={proj.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="px-6 py-4" scope="row">
                  <div className="flex flex-col">
                    <span className="font-semibold text-[#111111]">{proj.title}</span>
                    <span className="text-[10px] text-[#7A7A7A] font-mono">{proj.slug}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-[#555555] font-semibold">{proj.location}</td>
                <td className="px-6 py-4">
                  <Badge variant="neutral">{proj.clientType}</Badge>
                </td>
                <td className="px-6 py-4">
                  {canEdit ? (
                    <button
                      onClick={() => handleToggleActive(proj._id, proj.isActive)}
                      disabled={isToggling}
                      className="cursor-pointer border-none bg-transparent p-0 m-0 outline-none"
                    >
                      <Badge variant={proj.isActive ? 'success' : 'neutral'}>
                        {proj.isActive ? 'Active' : 'Draft'}
                      </Badge>
                    </button>
                  ) : (
                    <Badge variant={proj.isActive ? 'success' : 'neutral'}>
                      {proj.isActive ? 'Active' : 'Draft'}
                    </Badge>
                  )}
                </td>
                <td className="px-6 py-4 font-semibold text-[#7A7A7A] font-mono text-xs">{proj.completionYear}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {canEdit && (
                      <Link
                        href={`/admin/gallery/${proj._id}/edit`}
                        className="inline-flex items-center justify-center p-2 min-w-0 rounded-full border border-[#E8E2DA] bg-transparent text-[#111111] hover:border-[#111111] hover:bg-neutral-50 transition-all cursor-pointer outline-none"
                        title="Edit details"
                      >
                        <Edit size={14} />
                      </Link>
                    )}
                    {canDelete && (
                      <button
                        onClick={() => setDeleteId(proj._id)}
                        className="inline-flex items-center justify-center p-2 min-w-0 rounded-full border border-red-200 bg-red-50 text-red-700 hover:bg-[#b81d2d] hover:text-white transition-all cursor-pointer outline-none"
                        title="Delete Listing"
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
                No showcase projects found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Delete Prompt Modal */}
      <ConfirmModal
        isOpen={!!deleteId}
        title="Delete Showcase Project"
        description="Are you sure you want to permanently delete this landmark project listing? This removes all details and photos from the public gallery."
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />

    </div>
  )
}
