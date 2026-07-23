'use client'

import { useState } from 'react'
import { Plus, Edit, Trash2, Shield, Calendar, RefreshCw } from 'lucide-react'
import UserForm from '@/components/admin/UserForm'
import ConfirmModal from '@/components/admin/ConfirmModal'
import { hasPermission } from '@/permissions/permissions'
import { PERMISSIONS } from '@/permissions/roles'
import { AnimatePresence } from 'framer-motion'

// Design System Components
import PageHeader from '@/components/composition/PageHeader'
import Badge from '@/components/ui/Badge'

export default function UsersClient({ initialUsers = [], currentAdmin }) {
  const [users, setUsers] = useState(initialUsers)
  const [activeUser, setActiveUser] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleRefresh = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/users')
      const data = await res.json()
      if (data.success && data.users) {
        setUsers(data.users)
      }
    } catch {
      console.error('Failed to reload team members list')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    const id = deleteId
    setDeleteId(null)
    if (!id) return

    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (res.ok && data.success) {
        setUsers(users.filter(u => u._id !== id))
      } else {
        alert(data.error || 'Failed to delete user')
      }
    } catch {
      alert('Network error')
    }
  }

  const handleFormSubmit = () => {
    setShowForm(false)
    setActiveUser(null)
    handleRefresh()
  }

  const formatRole = (role) => {
    return role.split('_').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ')
  }

  const canCreate = hasPermission(currentAdmin, PERMISSIONS.CREATE_USER)
  const canEdit = hasPermission(currentAdmin, PERMISSIONS.EDIT_USER)
  const canDelete = currentAdmin?.role === 'SUPER_ADMIN' // Only SUPER_ADMIN can delete accounts

  return (
    <div className="space-y-6 select-none">
      
      {/* Top Header */}
      <PageHeader
        title="Team Members"
        subtitle={`${users.length} rostered`}
        actions={
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="p-2 border border-[#E8E2DA] hover:border-[#111111] rounded-xl bg-white hover:bg-neutral-50 cursor-pointer disabled:opacity-50 outline-none transition-all flex items-center justify-center"
              title="Refresh List"
            >
              <RefreshCw className={`w-4 h-4 text-[#7A7A7A] ${loading ? 'animate-spin' : ''}`} />
            </button>
            {canCreate && (
              <button
                onClick={() => { setActiveUser(null); setShowForm(true) }}
                className="inline-flex items-center justify-center font-sans font-bold uppercase tracking-wider transition-all duration-300 bg-[#0E4FB3] text-white hover:bg-[#0b3c8a] active:bg-[#082a63] px-6 py-3 text-[11px] rounded-full cursor-pointer border-none outline-none"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Team Member
              </button>
            )}
          </div>
        }
      />

      {/* Team Roster Grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user, idx) => {
          const joinedDate = new Date(user.createdAt).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          })

          return (
            <div
              key={String(user._id || user.id || user.email || idx)}
              className={`bg-white rounded-2xl p-5 border border-[#E8E2DA] shadow-sm flex flex-col justify-between relative hover:shadow-md transition-shadow duration-300 ${
                !user.isActive ? 'opacity-60' : ''
              }`}
            >
              {/* Profile card content */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-full bg-[#0E4FB3]/10 text-[#0E4FB3] flex items-center justify-center font-bold text-sm font-sans select-none">
                    {user.name.slice(0, 2).toUpperCase()}
                  </div>
                  
                  {/* Status Indicator bubble */}
                  <Badge variant={user.isActive ? 'success' : 'neutral'}>
                    {user.isActive ? 'Active' : 'Suspended'}
                  </Badge>
                </div>

                <div className="space-y-1">
                  <h3 className="font-sans font-bold text-[#111111] text-sm leading-tight">
                    {user.name}
                  </h3>
                  <p className="text-xs text-[#7A7A7A] truncate font-mono mt-0.5">{user.email}</p>
                </div>

                {/* Role and joined dates tags */}
                <div className="flex flex-col gap-1.5 pt-1.5 border-t border-[#E8E2DA] text-xs text-[#555555] font-sans">
                  <div className="flex items-center justify-between">
                    <span>Role Group:</span>
                    <Badge variant="primary">
                      {formatRole(user.role)}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between font-mono text-[10px] text-[#7A7A7A]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      Joined:
                    </span>
                    <span>{joinedDate}</span>
                  </div>
                </div>
              </div>

              {/* Action bar */}
              <div className="flex items-center justify-end gap-2 border-t border-[#E8E2DA] pt-4 mt-5">
                {canEdit && (
                  <button
                    onClick={() => { setActiveUser(user); setShowForm(true) }}
                    className="p-1.5 rounded-lg text-[#7A7A7A] hover:text-[#0E4FB3] hover:bg-neutral-50 cursor-pointer bg-transparent border-none outline-none transition-colors"
                    title="Edit team member access"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                )}
                {canDelete && user._id !== currentAdmin.id && (
                  <button
                    onClick={() => setDeleteId(user._id)}
                    className="p-1.5 rounded-lg text-[#7A7A7A] hover:text-red-600 hover:bg-neutral-50 cursor-pointer bg-transparent border-none outline-none transition-colors"
                    title="Remove user account"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

            </div>
          )
        })}
      </div>

      {/* Deletion Confirm Modal */}
      <ConfirmModal
        isOpen={!!deleteId}
        title="Remove User Account"
        description="Are you sure you want to permanently delete this team member? This terminates their system credentials and invalidates active sessions."
        confirmLabel="Delete Account"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />

      {/* Add / Edit Form Modal Dialog */}
      <AnimatePresence>
        {showForm && (
          <UserForm
            admin={activeUser}
            currentAdmin={currentAdmin}
            onClose={() => { setShowForm(false); setActiveUser(null) }}
            onSubmit={handleFormSubmit}
          />
        )}
      </AnimatePresence>

    </div>
  )
}
