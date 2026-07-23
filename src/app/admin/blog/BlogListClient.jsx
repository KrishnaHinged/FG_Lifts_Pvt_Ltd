'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2, Calendar, BookOpen, FileText } from 'lucide-react'
import ConfirmModal from '@/components/admin/ConfirmModal'
import { hasPermission } from '@/permissions/permissions'
import { PERMISSIONS } from '@/permissions/roles'

// Design System Components
import PageHeader from '@/components/composition/PageHeader'
import SearchBar from '@/components/forms/SearchBar'
import Table from '@/components/composition/Table'
import Badge from '@/components/ui/Badge'

export default function BlogListClient({ initialPosts = [], currentAdmin }) {
  const [posts, setPosts] = useState(initialPosts)
  const [search, setSearch] = useState('')
  const [deleteId, setDeleteId] = useState(null)
  const [togglingId, setTogglingId] = useState(null)

  const handleTogglePublish = async (id, currentVal) => {
    setTogglingId(id)
    try {
      const res = await fetch(`/api/admin/blog/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !currentVal }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setPosts(posts.map(p => p._id === id ? { ...p, isPublished: !currentVal } : p))
      } else {
        alert(data.error || 'Failed to update publication status')
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
      const res = await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (res.ok && data.success) {
        setPosts(posts.filter(p => p._id !== id))
      } else {
        alert(data.error || 'Failed to delete article')
      }
    } catch {
      alert('Network error')
    }
  }

  // Filter posts
  const filtered = posts.filter(p => {
    const term = search.toLowerCase()
    return (
      p.title.toLowerCase().includes(term) ||
      p.slug.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term)
    )
  })

  const canCreate = hasPermission(currentAdmin, PERMISSIONS.CREATE_BLOG)
  const canEdit = hasPermission(currentAdmin, PERMISSIONS.EDIT_BLOG)
  const canDelete = hasPermission(currentAdmin, PERMISSIONS.DELETE_BLOG)
  const canPublish = hasPermission(currentAdmin, PERMISSIONS.PUBLISH_BLOG)

  return (
    <div className="space-y-6 select-none">
      
      {/* Top Header */}
      <PageHeader
        title="Blog CMS"
        actions={
          canCreate && (
            <Link
              href="/admin/blog/new"
              className="inline-flex items-center justify-center font-sans font-bold uppercase tracking-wider transition-all duration-300 bg-[#0E4FB3] text-white hover:bg-[#0b3c8a] active:bg-[#082a63] px-6 py-3 text-[11px] rounded-full no-underline"
            >
              <Plus className="w-4 h-4 mr-2" />
              Write Article
            </Link>
          )
        }
      />

      {/* Search filter row */}
      <div className="w-full max-w-md">
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by article title, tag or slug..."
        />
      </div>

      {/* Listing Table */}
      <Table>
        <thead>
          <tr className="bg-[#EDE8E2]/50 border-b border-[#E8E2DA]">
            <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-[#7A7A7A] font-bold" scope="col">Article Detail</th>
            <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-[#7A7A7A] font-bold" scope="col">Category</th>
            <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-[#7A7A7A] font-bold" scope="col">Author Profile</th>
            <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-[#7A7A7A] font-bold" scope="col">Status</th>
            <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-[#7A7A7A] font-bold" scope="col">Publish Date</th>
            <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-[#7A7A7A] font-bold text-center" scope="col">Views</th>
            <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-[#7A7A7A] font-bold text-right" scope="col">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E8E2DA]">
          {filtered.map((post) => {
            const isToggling = togglingId === post._id
            const formattedDate = post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })
              : 'Draft'

            return (
              <tr key={post._id} className={`hover:bg-neutral-50/50 transition-colors ${isToggling ? 'opacity-50 pointer-events-none' : ''}`}>
                <td className="px-6 py-4 max-w-xs" scope="row">
                  <div className="flex flex-col">
                    <span className="font-semibold text-[#111111] truncate">{post.title}</span>
                    <span className="text-[10px] text-[#7A7A7A] font-mono truncate">{post.slug}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-[#555555] font-semibold">{post.category}</td>
                <td className="px-6 py-4 text-xs font-semibold text-[#555555]">
                  {post.author?.name || 'Editorial Team'}
                </td>
                <td className="px-6 py-4">
                  {canPublish ? (
                    <button
                      onClick={() => handleTogglePublish(post._id, post.isPublished)}
                      disabled={isToggling}
                      className="cursor-pointer border-none bg-transparent p-0 m-0 outline-none"
                    >
                      <Badge variant={post.isPublished ? 'success' : 'warning'}>
                        {post.isPublished ? 'Published' : 'Draft'}
                      </Badge>
                    </button>
                  ) : (
                    <Badge variant={post.isPublished ? 'success' : 'warning'}>
                      {post.isPublished ? 'Published' : 'Draft'}
                    </Badge>
                  )}
                </td>
                <td className="px-6 py-4 text-xs text-[#7A7A7A] font-mono">
                  {formattedDate}
                </td>
                <td className="px-6 py-4 text-center font-mono text-xs font-bold text-[#555555]">
                  {post.views || 0}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {canEdit && (
                      <Link
                        href={`/admin/blog/${post._id}/edit`}
                        className="inline-flex items-center justify-center p-2 min-w-0 rounded-full border border-[#E8E2DA] bg-transparent text-[#111111] hover:border-[#111111] hover:bg-neutral-50 transition-all cursor-pointer outline-none"
                        title="Edit details"
                      >
                        <Edit size={14} />
                      </Link>
                    )}
                    {canDelete && (
                      <button
                        onClick={() => setDeleteId(post._id)}
                        className="inline-flex items-center justify-center p-2 min-w-0 rounded-full border border-red-200 bg-red-50 text-red-700 hover:bg-[#b81d2d] hover:text-white transition-all cursor-pointer outline-none"
                        title="Delete Article"
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
                No articles found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Delete Prompt Modal */}
      <ConfirmModal
        isOpen={!!deleteId}
        title="Delete Article"
        description="Are you sure you want to permanently delete this blog post? This removes the article and its SEO details from the public list."
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />

    </div>
  )
}
