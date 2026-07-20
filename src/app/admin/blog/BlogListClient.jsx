'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2, Search, Calendar, BookOpen, FileText } from 'lucide-react'
import ConfirmModal from '@/components/admin/ConfirmModal'
import { hasPermission } from '@/permissions/permissions'
import { PERMISSIONS } from '@/permissions/roles'

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
      <div className="flex items-center justify-between">
        <h1 className="font-sans font-bold text-gray-900 text-2xl tracking-tight leading-none">
          Blog CMS
        </h1>
        {canCreate && (
          <Link
            href="/admin/blog/new"
            className="inline-flex items-center gap-1.5 bg-fg-blue text-white rounded-full px-5 py-2.5 font-sans font-bold text-xs shadow-sm hover:shadow-md hover:bg-fg-blue/90 transition-all no-underline cursor-pointer border-none outline-none"
          >
            <Plus className="w-4 h-4" />
            Write Article
          </Link>
        )}
      </div>

      {/* Search filter row */}
      <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-4 py-2.5 max-w-md shadow-xs">
        <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by article title, tag or slug..."
          className="flex-1 font-sans text-xs text-gray-900 placeholder:text-gray-400 outline-none border-none"
        />
      </div>

      {/* Listing Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse" role="table">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 font-mono text-[10px] font-bold uppercase tracking-wider text-gray-400">
                <th className="px-6 py-4" scope="col">Article Detail</th>
                <th className="px-6 py-4" scope="col">Category</th>
                <th className="px-6 py-4" scope="col">Author Profile</th>
                <th className="px-6 py-4" scope="col">Status</th>
                <th className="px-6 py-4" scope="col">Publish Date</th>
                <th className="px-6 py-4 font-mono text-center" scope="col">Views</th>
                <th className="px-6 py-4 text-right" scope="col">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 font-sans text-sm text-gray-700">
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
                  <tr key={post._id} className={isToggling ? 'opacity-50 pointer-events-none' : ''}>
                    <td className="px-6 py-4 max-w-xs" scope="row">
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-950 truncate">{post.title}</span>
                        <span className="text-[10px] text-gray-400 font-mono truncate">{post.slug}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 font-semibold">{post.category}</td>
                    <td className="px-6 py-4 text-xs font-semibold text-gray-500">
                      {post.author?.name || 'Editorial Team'}
                    </td>
                    <td className="px-6 py-4">
                      {canPublish ? (
                        <button
                          onClick={() => handleTogglePublish(post._id, post.isPublished)}
                          disabled={isToggling}
                          className={`inline-flex items-center gap-1 text-[10px] font-bold font-mono px-2.5 py-0.5 rounded border cursor-pointer bg-transparent transition-colors ${
                            post.isPublished
                              ? 'border-emerald-200 text-emerald-700 bg-emerald-50'
                              : 'border-amber-200 text-amber-700 bg-amber-50'
                          }`}
                        >
                          {post.isPublished ? 'Published' : 'Draft'}
                        </button>
                      ) : (
                        <span className={`inline-block text-[10px] font-bold font-mono px-2 py-0.5 rounded border ${
                          post.isPublished ? 'border-emerald-100 text-emerald-600 bg-emerald-50' : 'border-amber-200 text-amber-600 bg-amber-50'
                        }`}>
                          {post.isPublished ? 'Published' : 'Draft'}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-400 font-mono">
                      {formattedDate}
                    </td>
                    <td className="px-6 py-4 text-center font-mono text-xs font-bold text-gray-500">
                      {post.views || 0}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {canEdit && (
                          <Link
                            href={`/admin/blog/${post._id}/edit`}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-fg-blue hover:bg-gray-50 cursor-pointer outline-none transition-colors inline-block"
                            title="Edit details"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                        )}
                        {canDelete && (
                          <button
                            onClick={() => setDeleteId(post._id)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-gray-50 cursor-pointer bg-transparent border-none outline-none"
                            title="Delete Article"
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
                    No articles found.
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
        title="Delete Article"
        description="Are you sure you want to permanently delete this blog post? This removes the article and its SEO details from the public list."
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />

    </div>
  )
}
