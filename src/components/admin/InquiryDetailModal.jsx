'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Loader2 } from 'lucide-react'
import { hasPermission } from '@/permissions/permissions'
import { PERMISSIONS } from '@/permissions/roles'

export default function InquiryDetailModal({
  inquiry,
  admins = [],
  currentAdmin,
  onClose,
  onUpdate
}) {
  const [noteText, setNoteText] = useState('')
  const [submittingNote, setSubmittingNote] = useState(false)
  const [updatingStatus, setUpdatingStatus] = useState(false)
  const [updatingAssignee, setUpdatingAssignee] = useState(false)
  const [statusFlash, setStatusFlash] = useState(false)
  const [assignFlash, setAssignFlash] = useState(false)

  // ESC key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const handleStatusChange = async (status) => {
    setUpdatingStatus(true)
    try {
      const res = await fetch(`/api/admin/inquiries/${inquiry._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setStatusFlash(true)
        setTimeout(() => setStatusFlash(false), 1500)
        onUpdate(data.inquiry)
      } else {
        alert(data.error || 'Failed to update status')
      }
    } catch {
      alert('Network error')
    } finally {
      setUpdatingStatus(false)
    }
  }

  const handleAssignChange = async (assignedTo) => {
    setUpdatingAssignee(true)
    try {
      const res = await fetch(`/api/admin/inquiries/${inquiry._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assignedTo }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setAssignFlash(true)
        setTimeout(() => setAssignFlash(false), 1500)
        onUpdate(data.inquiry)
      } else {
        alert(data.error || 'Failed to update assignee')
      }
    } catch {
      alert('Network error')
    } finally {
      setUpdatingAssignee(false)
    }
  }

  const handleAddNote = async (e) => {
    e.preventDefault()
    if (!noteText.trim() || submittingNote) return

    setSubmittingNote(true)
    try {
      const res = await fetch(`/api/admin/inquiries/${inquiry._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ noteText: noteText }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setNoteText('')
        onUpdate(data.inquiry)
      } else {
        alert(data.error || 'Failed to add note')
      }
    } catch {
      alert('Network error')
    } finally {
      setSubmittingNote(false)
    }
  }

  // Get status pill colors
  const getStatusBadgeStyles = (status) => {
    switch (status) {
      case 'New':
        return 'bg-blue-50 text-blue-700 border border-blue-200'
      case 'Contacted':
        return 'bg-amber-50 text-amber-700 border border-amber-200'
      case 'Qualified':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200'
      case 'Closed':
        return 'bg-slate-50 text-slate-700 border border-slate-200'
      case 'Rejected':
        return 'bg-red-50 text-red-700 border border-red-200'
      default:
        return 'bg-gray-50 text-gray-700 border border-gray-200'
    }
  }

  // Filter sales executives
  const salesTeam = admins.filter(a => a.isActive && a.role === 'SALES_EXECUTIVE')

  // Date formatting
  const formattedReceived = new Date(inquiry.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  // Time ago helper for notes
  const timeAgo = (dateString) => {
    const now = new Date()
    const past = new Date(dateString)
    const diffMs = now - past
    const diffMins = Math.floor(diffMs / 60000)
    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins} minutes ago`
    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours} hours ago`
    const diffDays = Math.floor(diffHours / 24)
    if (diffDays === 1) return 'Yesterday'
    return past.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Initials for note avatar
  const getInitials = (name = '') => {
    return name
      .split(' ')
      .map(n => n.charAt(0))
      .slice(0, 2)
      .join('')
      .toUpperCase()
  }

  // Inquiry Ref: last 6 chars of _id uppercased
  const inquiryRef = `#${(inquiry._id || '').slice(-6).toUpperCase()}`

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#071B38]/70 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative bg-white rounded-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto z-10 flex flex-col p-6 md:p-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer border-none bg-transparent outline-none"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 1. HEADER */}
        <div className="flex flex-col gap-1.5 border-b border-[#E5E7EB] pb-5">
          <span className="font-mono text-xs text-[#6B7280]">
            {inquiryRef}
          </span>
          <div className="flex flex-wrap items-center gap-3.5 mt-1">
            <h2 className="font-display text-2xl md:text-3xl text-[#111827] leading-none m-0 font-normal">
              {inquiry.name}
            </h2>
            <span className={`font-sans text-xs px-2.5 py-0.5 rounded-full font-bold uppercase ${getStatusBadgeStyles(inquiry.status)}`}>
              {inquiry.status}
            </span>
          </div>
        </div>

        {/* 2. DETAILS GRID */}
        <div className="py-6 flex flex-col gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div className="flex flex-col">
              <span className="font-mono text-xs text-[#6B7280] uppercase tracking-wider">Name</span>
              <span className="text-[#111827] text-sm mt-0.5 font-medium">{inquiry.name}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xs text-[#6B7280] uppercase tracking-wider">Email</span>
              <a href={`mailto:${inquiry.email}`} className="text-[#0E4FB3] text-sm mt-0.5 hover:underline font-medium break-all">
                {inquiry.email}
              </a>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xs text-[#6B7280] uppercase tracking-wider">Phone</span>
              <a href={`tel:${inquiry.phone}`} className="text-[#0E4FB3] text-sm mt-0.5 hover:underline font-medium">
                {inquiry.phone}
              </a>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xs text-[#6B7280] uppercase tracking-wider">Company</span>
              <span className="text-[#111827] text-sm mt-0.5 font-medium">{inquiry.company || 'Private Residence / Project'}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xs text-[#6B7280] uppercase tracking-wider">City</span>
              <span className="text-[#111827] text-sm mt-0.5 font-medium">{inquiry.city || 'Not Specified'}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xs text-[#6B7280] uppercase tracking-wider">Elevator Type</span>
              <span className="text-[#111827] text-sm mt-0.5 font-medium">{inquiry.elevatorType || 'Not Specified'}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xs text-[#6B7280] uppercase tracking-wider">Floors</span>
              <span className="text-[#111827] text-sm mt-0.5 font-medium">{inquiry.floorCount || inquiry.floors || 'Not Specified'}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xs text-[#6B7280] uppercase tracking-wider">Source</span>
              <span className="text-[#111827] text-sm mt-0.5 font-medium font-mono text-xs">{inquiry.source || 'Website Contact Form'}</span>
            </div>
            <div className="flex flex-col md:col-span-2">
              <span className="font-mono text-xs text-[#6B7280] uppercase tracking-wider">Received</span>
              <span className="text-[#111827] text-sm mt-0.5 font-medium">{formattedReceived}</span>
            </div>
          </div>

          {inquiry.message && (
            <div className="bg-[#F4F6F9] rounded-xl p-4 mt-2">
              <span className="font-mono text-xs text-[#6B7280] uppercase tracking-wider mb-1.5 block">Message</span>
              <p className="text-[#3D3D3D] text-sm leading-relaxed m-0 italic">
                &ldquo;{inquiry.message}&rdquo;
              </p>
            </div>
          )}
        </div>

        {/* 3 & 4. STATUS & ASSIGNMENT PANEL */}
        <div className="border-t border-[#E5E7EB] pt-6 pb-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Status changer */}
          <div className="flex flex-col">
            <span className="font-mono text-xs text-[#6B7280] uppercase tracking-wider mb-2">Update Status</span>
            {hasPermission(currentAdmin, PERMISSIONS.UPDATE_INQUIRY_STATUS) ? (
              <div className="relative">
                <select
                  value={inquiry.status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  disabled={updatingStatus}
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-white font-sans text-sm font-semibold outline-none transition-all cursor-pointer ${
                    statusFlash
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-800 focus:border-emerald-500'
                      : 'border-gray-200 hover:border-gray-300 focus:border-[#0E4FB3]'
                  }`}
                >
                  {['New', 'Contacted', 'Qualified', 'Closed', 'Rejected'].map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                {statusFlash && (
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-emerald-600">
                    Updated
                  </span>
                )}
              </div>
            ) : (
              <span className="text-[#111827] text-sm font-semibold py-2.5">
                {inquiry.status}
              </span>
            )}
          </div>

          {/* Assignment dropdown */}
          <div className="flex flex-col">
            <span className="font-mono text-xs text-[#6B7280] uppercase tracking-wider mb-2">Assigned To</span>
            {hasPermission(currentAdmin, PERMISSIONS.ASSIGN_INQUIRY) ? (
              <div className="relative">
                <select
                  value={inquiry.assignedTo?._id || inquiry.assignedTo || ''}
                  onChange={(e) => handleAssignChange(e.target.value)}
                  disabled={updatingAssignee}
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-white font-sans text-sm font-semibold outline-none transition-all cursor-pointer ${
                    assignFlash
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-800 focus:border-emerald-500'
                      : 'border-gray-200 hover:border-gray-300 focus:border-[#0E4FB3]'
                  }`}
                >
                  <option value="">Unassigned</option>
                  {salesTeam.map(admin => (
                    <option key={admin._id} value={admin._id}>{admin.name}</option>
                  ))}
                </select>
                {assignFlash && (
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-emerald-600">
                    Assigned
                  </span>
                )}
              </div>
            ) : (
              <span className="text-[#111827] text-sm font-semibold py-2.5">
                {inquiry.assignedTo?.name || 'Unassigned'}
              </span>
            )}
          </div>
        </div>

        {/* 5. NOTES THREAD */}
        <div className="border-t border-[#E5E7EB] pt-6 mt-4">
          <h3 className="font-sans font-semibold text-[#111827] text-base mb-4">
            Activity Notes
          </h3>
          <div className="space-y-4 max-h-60 overflow-y-auto pr-2 mb-6">
            {inquiry.notes && inquiry.notes.length > 0 ? (
              [...inquiry.notes].map((note, index) => (
                <div key={index} className="flex gap-3 items-start border-b border-[#E5E7EB] pb-4 mb-4 last:border-0 last:pb-0 last:mb-0">
                  <div className="w-8 h-8 bg-[#0E4FB3] rounded-full text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    {getInitials(note.adminName)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                      <span className="font-sans text-sm font-medium text-[#111827]">
                        {note.adminName}
                      </span>
                      <span className="font-mono text-xs text-[#6B7280]">
                        {timeAgo(note.createdAt)}
                      </span>
                    </div>
                    <p className="text-[#3D3D3D] text-sm leading-relaxed mt-1 m-0">
                      {note.text}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="font-mono text-xs text-[#7A7A7A] text-center py-6 m-0">
                No notes yet.
              </p>
            )}
          </div>
        </div>

        {/* 6. ADD NOTE FORM */}
        {hasPermission(currentAdmin, PERMISSIONS.ADD_INQUIRY_NOTE) && (
          <form onSubmit={handleAddNote} className="flex flex-col gap-3 pt-2">
            <textarea
              rows={3}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Add a note..."
              disabled={submittingNote}
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#0E4FB3] resize-none disabled:opacity-50 disabled:bg-gray-50"
            />
            <div className="flex justify-end select-none">
              <button
                type="submit"
                disabled={submittingNote || !noteText.trim()}
                className="bg-[#0E4FB3] text-white px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer border-none outline-none disabled:opacity-50 hover:bg-[#0E4FB3]/90 transition-colors flex items-center gap-1.5"
              >
                {submittingNote && <Loader2 className="w-4 h-4 animate-spin" />}
                Add Note
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  )
}
