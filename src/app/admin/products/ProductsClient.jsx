'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2, Search, Rotate3d, CheckCircle, XCircle } from 'lucide-react'
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

const categories = ['All', 'Passenger', 'Goods', 'Capsule', 'Hospital', 'Panoramic']

export default function ProductsClient({ initialProducts = [], currentAdmin }) {
  const [products, setProducts] = useState(initialProducts)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [deleteId, setDeleteId] = useState(null)
  const [togglingId, setTogglingId] = useState(null)

  const handleToggleActive = async (id, currentVal) => {
    setTogglingId(id)
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentVal }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setProducts(products.map(p => p._id === id ? { ...p, isActive: !currentVal } : p))
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
      const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (res.ok && data.success) {
        setProducts(products.filter(p => p._id !== id))
      } else {
        alert(data.error || 'Failed to delete product')
      }
    } catch {
      alert('Network error')
    }
  }

  // Filter products client-side (exclude Home Lift products from Products tab)
  const nonHomeLifts = products.filter(p => p.category !== 'Home Lift' && p.category !== 'Home')

  const filtered = nonHomeLifts.filter(p => {
    const term = search.toLowerCase()
    const matchesSearch = p.name.toLowerCase().includes(term) || p.slug.toLowerCase().includes(term)
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const canCreate = hasPermission(currentAdmin, PERMISSIONS.CREATE_PRODUCT)
  const canEdit = hasPermission(currentAdmin, PERMISSIONS.EDIT_PRODUCT)
  const canDelete = hasPermission(currentAdmin, PERMISSIONS.DELETE_PRODUCT)

  return (
    <div className="space-y-6 select-none">
      
      {/* Top Header */}
      <PageHeader
        title="Products"
        actions={
          canCreate && (
            <Link
              href="/admin/products/new"
              className="inline-flex items-center justify-center font-sans font-bold uppercase tracking-wider transition-all duration-300 bg-[#0E4FB3] text-white hover:bg-[#0b3c8a] active:bg-[#082a63] px-6 py-3 text-[11px] rounded-full no-underline"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Product System
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
            placeholder="Search by system name or slug..."
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

      {/* Catalog Table */}
      <Table>
        <thead>
          <tr className="bg-[#EDE8E2]/50 border-b border-[#E8E2DA]">
            <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-[#7A7A7A] font-bold" scope="col">Image</th>
            <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-[#7A7A7A] font-bold" scope="col">System Name</th>
            <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-[#7A7A7A] font-bold" scope="col">Category</th>
            <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-[#7A7A7A] font-bold" scope="col">Grouping</th>
            <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-[#7A7A7A] font-bold" scope="col">Status</th>
            <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-[#7A7A7A] font-bold" scope="col">360° Customizer</th>
            <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-[#7A7A7A] font-bold text-right" scope="col">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E8E2DA]">
          {filtered.map((prod) => {
            const isToggling = togglingId === prod._id
            return (
              <tr key={prod._id} className={`hover:bg-neutral-50/50 transition-colors ${isToggling ? 'opacity-50 pointer-events-none' : ''}`}>
                <td className="px-6 py-4">
                  <div className="w-12 h-9 relative border border-[#E8E2DA] rounded bg-gray-50 overflow-hidden">
                    <img
                      src={prod.images?.[0]?.url || '/images/projects-collage.png'}
                      alt={prod.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="px-6 py-4" scope="row">
                  <div className="flex flex-col">
                    <span className="font-semibold text-[#111111]">{prod.name}</span>
                    <span className="text-[10px] text-[#7A7A7A] font-mono">{prod.slug}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-[#555555] font-semibold">{prod.category}</td>
                <td className="px-6 py-4">
                  <Badge variant="neutral">{prod.tabGroup}</Badge>
                </td>
                <td className="px-6 py-4">
                  {canEdit ? (
                    <button
                      onClick={() => handleToggleActive(prod._id, prod.isActive)}
                      disabled={isToggling}
                      className="cursor-pointer border-none bg-transparent p-0 m-0 outline-none"
                    >
                      <Badge variant={prod.isActive ? 'success' : 'neutral'}>
                        {prod.isActive ? 'Active' : 'Draft'}
                      </Badge>
                    </button>
                  ) : (
                    <Badge variant={prod.isActive ? 'success' : 'neutral'}>
                      {prod.isActive ? 'Active' : 'Draft'}
                    </Badge>
                  )}
                </td>
                <td className="px-6 py-4">
                  {prod.has360View ? (
                    <Badge variant="primary" className="gap-1.5 flex w-fit items-center">
                      <Rotate3d className="w-3 h-3" />
                      Enabled
                    </Badge>
                  ) : (
                    <span className="text-[#7A7A7A] text-xs font-mono">-</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {canEdit && (
                      <Link
                        href={`/admin/products/${prod._id}/edit`}
                        className="inline-flex items-center justify-center p-2 min-w-0 rounded-full border border-[#E8E2DA] bg-transparent text-[#111111] hover:border-[#111111] hover:bg-neutral-50 transition-all cursor-pointer outline-none"
                        title="Edit details"
                      >
                        <Edit size={14} />
                      </Link>
                    )}
                    {canDelete && (
                      <button
                        onClick={() => setDeleteId(prod._id)}
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
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Delete Prompt Modal */}
      <ConfirmModal
        isOpen={!!deleteId}
        title="Delete Product"
        message="Are you sure you want to permanently delete this system? This action removes all color configurations and specifications data."
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onClose={() => setDeleteId(null)}
      />

    </div>
  )
}
