'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, User, Calendar, MapPin, Building, RefreshCw } from 'lucide-react'
import { hasPermission } from '@/permissions/permissions'
import { PERMISSIONS } from '@/permissions/roles'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'

const statuses = ['New', 'Contacted', 'Qualified', 'Closed', 'Rejected']

export default function InquiriesKanban({ inquiries = [], admins = [], currentAdmin, onUpdate }) {
  const [activeMenuId, setActiveMenuId] = useState(null)
  const [activeAssignId, setActiveAssignId] = useState(null)
  const [updatingId, setUpdatingId] = useState(null)
  const [announcement, setAnnouncement] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result
    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const card = inquiries.find((i) => i._id === draggableId)
    if (card) {
      handleStatusChange(draggableId, destination.droppableId)
      setAnnouncement(`Lead ${card.name} moved to ${destination.droppableId}`)
      setTimeout(() => setAnnouncement(''), 3000)
    }
  }

  const handleStatusChange = async (id, newStatus) => {
    setActiveMenuId(null)
    setUpdatingId(id)
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
        alert(data.error || 'Failed to update status')
      }
    } catch {
      alert('Network error')
    } finally {
      setUpdatingId(null)
    }
  }

  const handleAssignChange = async (id, adminId) => {
    setActiveAssignId(null)
    setUpdatingId(id)
    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, assignedTo: adminId }),
      })
      const data = await res.json()
      if (data.success) {
        onUpdate()
      } else {
        alert(data.error || 'Failed to assign lead')
      }
    } catch {
      alert('Network error')
    } finally {
      setUpdatingId(null)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'New': return 'border-t-[#0E4FB3]/80'
      case 'Contacted': return 'border-t-[#E8600A]/85'
      case 'Qualified': return 'border-t-emerald-600/80'
      case 'Closed': return 'border-t-gray-400'
      case 'Rejected': return 'border-t-red-600/80'
      default: return 'border-t-gray-200'
    }
  }

  const formatTimeAgo = (dateStr) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 60) return `${diffMins || 1}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    return `${diffDays}d ago`
  }

  const salesTeam = admins.filter(a => a.isActive && (a.role === 'SALES_EXECUTIVE' || a.role === 'SALES_MANAGER'))

  if (!mounted) {
    return (
      <div className="flex gap-4 overflow-x-auto pb-6 select-none no-scrollbar">
        {statuses.map((status) => (
          <div key={status} className="flex-shrink-0 w-80 bg-gray-50 rounded-xl p-4 flex flex-col min-h-[400px]">
            <div className="font-sans font-bold text-gray-800 text-sm mb-4">{status}</div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {/* Screen Reader Live Announcements */}
      <div className="sr-only" aria-live="polite">
        {announcement}
      </div>

      <div className="flex gap-4 overflow-x-auto pb-6 select-none no-scrollbar">
        {statuses.map((status) => {
          const columnInquiries = inquiries.filter((i) => i.status === status)

          return (
            <Droppable key={status} droppableId={status}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`flex-shrink-0 w-80 rounded-xl p-4 flex flex-col max-h-[75vh] transition-all duration-200 ${
                    snapshot.isDraggingOver ? 'bg-blue-50/50 border-2 border-dashed border-blue-300' : 'bg-gray-50 border border-transparent'
                  }`}
                >
                  {/* Column Header */}
                  <div className="flex items-center justify-between mb-4 px-1">
                    <span className="font-sans font-bold text-gray-800 text-sm">{status}</span>
                    <span className="bg-gray-200/80 text-gray-600 font-mono text-xs px-2 py-0.5 rounded-full font-bold">
                      {columnInquiries.length}
                    </span>
                  </div>

                  {/* Cards Grid */}
                  <div className="flex-1 overflow-y-auto space-y-3 pr-1 py-1 no-scrollbar min-h-[150px]">
                    {columnInquiries.map((inquiry, index) => {
                      const isUpdating = updatingId === inquiry._id
                      const isAssigned = !!inquiry.assignedTo
                      const canAssign = hasPermission(currentAdmin, PERMISSIONS.ASSIGN_INQUIRY)
                      const canUpdateStatus = hasPermission(currentAdmin, PERMISSIONS.UPDATE_INQUIRY_STATUS)

                      return (
                        <Draggable
                          key={inquiry._id}
                          draggableId={inquiry._id}
                          index={index}
                          isDragDisabled={!canUpdateStatus || isUpdating}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                ...provided.draggableProps.style,
                              }}
                              className={`bg-white rounded-xl p-4 border border-gray-200 border-t-4 shadow-xs relative hover:shadow-md transition-shadow duration-300 ${getStatusColor(
                                status
                              )} ${isUpdating ? 'opacity-50 pointer-events-none' : ''} ${
                                snapshot.isDragging ? 'rotate-1 scale-[1.01] shadow-lg border-blue-400' : ''
                              }`}
                            >
                              {/* Top row */}
                              <div className="flex justify-between items-start gap-2 mb-1.5">
                                <h4 className="font-sans font-semibold text-gray-900 text-sm line-clamp-1">
                                  {inquiry.name}
                                </h4>
                                {isUpdating && <RefreshCw className="w-3.5 h-3.5 text-gray-400 animate-spin flex-shrink-0" />}
                              </div>

                              {/* Meta info */}
                              <div className="space-y-1 text-xs text-gray-500 mb-3 font-sans">
                                <div className="flex items-center gap-1.5">
                                  <Building className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" />
                                  <span className="truncate">{inquiry.company || 'Private Project'}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" />
                                  <span className="truncate">{inquiry.city || 'Location unverified'}</span>
                                </div>
                              </div>

                              {/* Chips & Tags */}
                              <div className="flex flex-wrap gap-1.5 mb-4">
                                <span className="bg-blue-50 border border-blue-100 text-blue-700 font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded font-bold">
                                  {inquiry.elevatorType || 'Universal'}
                                </span>
                              </div>

                              {/* Footer Info Row */}
                              <div className="flex items-center justify-between border-t border-gray-100 pt-3 relative">
                                {/* Left: Assign dropdown menu */}
                                <div className="relative">
                                  {canAssign ? (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        setActiveAssignId(activeAssignId === inquiry._id ? null : inquiry._id)
                                        setActiveMenuId(null)
                                      }}
                                      className="flex items-center gap-1 font-sans text-[10px] text-gray-500 hover:text-gray-900 font-semibold cursor-pointer bg-transparent border-none p-0 outline-none focus-visible:ring-2 focus-visible:ring-[#0E4FB3] rounded"
                                    >
                                      <User className="w-3 h-3 text-gray-400" />
                                      <span className="truncate max-w-[100px]">
                                        {isAssigned ? inquiry.assignedTo.name : 'Unassigned'}
                                      </span>
                                      <ChevronDown className="w-3 h-3 text-gray-400" />
                                    </button>
                                  ) : (
                                    <div className="flex items-center gap-1 text-[10px] text-gray-400 font-sans">
                                      <User className="w-3 h-3 text-gray-300" />
                                      <span className="truncate max-w-[100px]">
                                        {isAssigned ? inquiry.assignedTo.name : 'Unassigned'}
                                      </span>
                                    </div>
                                  )}

                                  {/* Assign list popover */}
                                  {activeAssignId === inquiry._id && (
                                    <div className="absolute left-0 bottom-full mb-1 z-30 w-48 bg-white border border-gray-200 rounded-xl shadow-lg p-1.5 flex flex-col">
                                      <button
                                        onClick={() => handleAssignChange(inquiry._id, '')}
                                        className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-sans text-red-600 hover:bg-gray-50 cursor-pointer bg-transparent border-none"
                                      >
                                        Unassign Lead
                                      </button>
                                      <div className="h-px bg-gray-100 my-1" />
                                      {salesTeam.map(user => (
                                        <button
                                          key={user._id}
                                          onClick={() => handleAssignChange(inquiry._id, user._id)}
                                          className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-sans text-gray-700 hover:bg-gray-50 cursor-pointer bg-transparent border-none"
                                        >
                                          {user.name}
                                        </button>
                                      ))}
                                    </div>
                                  )}
                                </div>

                                {/* Middle: Move Status Menu */}
                                {canUpdateStatus && (
                                  <div className="relative">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        setActiveMenuId(activeMenuId === inquiry._id ? null : inquiry._id)
                                        setActiveAssignId(null)
                                      }}
                                      className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 cursor-pointer bg-transparent border-none outline-none focus-visible:ring-2 focus-visible:ring-[#0E4FB3]"
                                    >
                                      <ChevronDown className="w-3.5 h-3.5" />
                                    </button>

                                    {/* Move list popover */}
                                    {activeMenuId === inquiry._id && (
                                      <div className="absolute right-0 bottom-full mb-1 z-30 w-36 bg-white border border-gray-200 rounded-xl shadow-lg p-1 flex flex-col">
                                        {statuses.filter(s => s !== status).map(s => (
                                          <button
                                            key={s}
                                            onClick={() => handleStatusChange(inquiry._id, s)}
                                            className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-sans text-gray-700 hover:bg-gray-50 cursor-pointer bg-transparent border-none"
                                          >
                                            Move to {s}
                                          </button>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                )}

                                {/* Right: Time ago */}
                                <span className="font-mono text-[10px] text-gray-400 flex items-center gap-1">
                                  <Calendar className="w-3 h-3 flex-shrink-0" />
                                  {formatTimeAgo(inquiry.createdAt)}
                                </span>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      )
                    })}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          )
        })}
      </div>
    </DragDropContext>
  )
}
