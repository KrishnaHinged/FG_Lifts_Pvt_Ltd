'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Edit2, Trash2, Sparkles, Calendar, Search } from 'lucide-react'

export default function TimelineClient({ initialMilestones = [] }) {
  const [milestones, setMilestones] = useState(initialMilestones)
  const [searchTerm, setSearchTerm] = useState('')
  const [deletingId, setDeletingId] = useState(null)

  const filtered = milestones.filter(m => 
    m.year.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.desc.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = async (id, title) => {
    if (!confirm(`Are you sure you want to delete milestone "${title}"?`)) return
    setDeletingId(id)
    try {
      const res = await fetch(`/api/admin/timeline/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (res.ok && data.success) {
        setMilestones(prev => prev.filter(m => m._id !== id && m.id !== id))
      } else {
        alert(data.error || 'Failed to delete milestone.')
      }
    } catch {
      alert('Network error.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="space-y-6 select-none max-w-6xl mx-auto">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-sans font-bold text-gray-900 text-2xl tracking-tight leading-none m-0">
            Company Milestone Timeline
          </h1>
          <p className="font-sans text-xs text-gray-500 m-0 mt-1">
            Manage company history milestones displayed on the public About page.
          </p>
        </div>

        <Link
          href="/admin/timeline/new"
          className="inline-flex items-center gap-1.5 bg-fg-blue text-white px-5 py-2.5 rounded-full font-sans font-bold text-xs uppercase tracking-wider hover:bg-fg-blue/90 shadow-sm transition no-underline cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Milestone
        </Link>
      </div>

      {/* Filter / Search input */}
      <div className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by year, title, or keyword..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 font-sans text-xs outline-none focus:border-fg-blue"
          />
        </div>
        <span className="font-mono text-xs text-gray-500 font-bold">
          Total Milestones: {filtered.length}
        </span>
      </div>

      {/* Milestones list */}
      <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="divide-y divide-gray-100">
          {filtered.map((item) => {
            const mId = item._id || item.id
            return (
              <div key={mId} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50/60 transition">
                <div className="flex items-start gap-4 flex-1">
                  {/* Photo thumbnail */}
                  <div className="w-20 h-14 rounded-xl overflow-hidden bg-neutral-900 border border-gray-200 relative shrink-0">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 font-mono text-[10px]">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Text Details */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-extrabold text-fg-blue bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-100">
                        {item.year}
                      </span>
                      {item.highlight && (
                        <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                          <Sparkles className="w-3 h-3 text-amber-500" />
                          Key Milestone
                        </span>
                      )}
                      {!item.isActive && (
                        <span className="font-mono text-[10px] uppercase font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">
                          Draft
                        </span>
                      )}
                    </div>
                    <h4 className="font-sans font-bold text-sm text-gray-900 m-0">
                      {item.title}
                    </h4>
                    <p className="font-sans text-xs text-gray-500 m-0 line-clamp-1 max-w-xl">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 self-end md:self-center">
                  <Link
                    href={`/admin/timeline/${mId}/edit`}
                    className="p-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-100 text-gray-700 transition cursor-pointer inline-flex items-center justify-center"
                    title="Edit milestone"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(mId, item.title)}
                    disabled={deletingId === mId}
                    className="p-2 rounded-xl border border-red-100 bg-white hover:bg-red-50 text-red-600 transition cursor-pointer disabled:opacity-50 inline-flex items-center justify-center"
                    title="Delete milestone"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )
          })}

          {filtered.length === 0 && (
            <div className="p-12 text-center text-gray-400 font-mono text-xs">
              No milestone entries found matching your query.
            </div>
          )}
        </div>
      </div>

    </div>
  )
}
