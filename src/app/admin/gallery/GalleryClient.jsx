'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2, Search, CheckCircle, XCircle } from 'lucide-react'
import FilterPillBar from '@/components/FilterPillBar'
import ConfirmModal from '@/components/admin/ConfirmModal'
import { hasPermission } from '@/permissions/permissions'
import { PERMISSIONS } from '@/permissions/roles'

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
        setProducts(products.map(p => p._id === id ? { ...p, isActive: !currentVal } : p))
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
      <div className="flex items-center justify-between">
        <h1 className="font-sans font-bold text-gray-900 text-2xl tracking-tight leading-none">
          Gallery
        </h1>
        {canCreate && (
          <Link
            href="/admin/gallery/new"
            className="inline-flex items-center gap-1.5 bg-fg-blue text-white rounded-full px-5 py-2.5 font-sans font-bold text-xs shadow-sm hover:shadow-md hover:bg-fg-blue/90 transition-all no-underline cursor-pointer border-none outline-none"
          >
            <Plus className="w-4 h-4" />
            Add Landmark Project
          </Link>
        )}
      </div>

      {/* Search & Category Pills bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 justify-between bg-white border border-gray-200 rounded-2xl p-4 shadow-xs">
        <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-3 py-2 max-w-sm flex-1">
          <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by landmark title, state or slug..."
            className="flex-1 font-sans text-xs text-gray-900 placeholder:text-gray-400 outline-none border-none"
          />
        </div>
        <div className="flex-shrink-0 max-w-[450px]">
          <FilterPillBar
            options={categories}
            active={activeCategory}
            onChange={setActiveCategory}
          />
        </div>
      </div>

      {/* Showcase Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse" role="table">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 font-mono text-[10px] font-bold uppercase tracking-wider text-gray-400">
                <th className="px-6 py-4" scope="col">Image</th>
                <th className="px-6 py-4" scope="col">Landmark Title</th>
                <th className="px-6 py-4" scope="col">Location</th>
                <th className="px-6 py-4" scope="col">Sector type</th>
                <th className="px-6 py-4" scope="col">Status</th>
                <th className="px-6 py-4" scope="col">Completion Year</th>
                <th className="px-6 py-4 text-right" scope="col">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 font-sans text-sm text-gray-700">
              {filtered.map((proj) => {
                const isToggling = togglingId === proj._id
                return (
                  <tr key={proj._id} className={isToggling ? 'opacity-50 pointer-events-none' : ''}>
                    <td className="px-6 py-4">
                      <div className="w-12 h-9 relative border border-gray-100 rounded bg-gray-50 overflow-hidden">
                        <img
                          src={proj.images?.[0]?.url || '/images/projects-collage.png'}
                          alt={proj.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4" scope="row">
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-950">{proj.title}</span>
                        <span className="text-[10px] text-gray-400 font-mono">{proj.slug}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 font-semibold">{proj.location}</td>
                    <td className="px-6 py-4">
                      <span className="bg-gray-100 border border-gray-200 text-gray-600 font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded font-bold">
                        {proj.clientType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {canEdit ? (
                        <button
                          onClick={() => handleToggleActive(proj._id, proj.isActive)}
                          disabled={isToggling}
                          className={`inline-flex items-center gap-1 text-[10px] font-bold font-mono px-2 py-0.5 rounded border cursor-pointer bg-transparent transition-colors ${
                            proj.isActive
                              ? 'border-emerald-200 text-emerald-700 bg-emerald-50'
                              : 'border-gray-200 text-gray-400 bg-gray-50'
                          }`}
                        >
                          {proj.isActive ? 'Active' : 'Draft'}
                        </button>
                      ) : (
                        <span className={`inline-block text-[10px] font-bold font-mono px-2 py-0.5 rounded border ${
                          proj.isActive ? 'border-emerald-100 text-emerald-600 bg-emerald-50' : 'border-gray-200 text-gray-400 bg-gray-50'
                        }`}>
                          {proj.isActive ? 'Active' : 'Draft'}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-500 font-mono text-xs">{proj.completionYear}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {canEdit && (
                          <Link
                            href={`/admin/gallery/${proj._id}/edit`}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-fg-blue hover:bg-gray-50 cursor-pointer outline-none transition-colors inline-block"
                            title="Edit details"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                        )}
                        {canDelete && (
                          <button
                            onClick={() => setDeleteId(proj._id)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-gray-50 cursor-pointer bg-transparent border-none outline-none"
                            title="Delete Listing"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-gray-400 font-mono text-xs uppercase tracking-wider">
                    No showcase projects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

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
