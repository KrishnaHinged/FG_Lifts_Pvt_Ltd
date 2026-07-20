'use client'

import { useState } from 'react'
import { X, Loader2 } from 'lucide-react'

export default function UserForm({ admin = null, currentAdmin, onSubmit, onClose }) {
  const [name, setName] = useState(admin?.name || '')
  const [email, setEmail] = useState(admin?.email || '')
  const [role, setRole] = useState(admin?.role || 'SALES_EXECUTIVE')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [showPasswordSection, setShowPasswordSection] = useState(false)
  const [isActive, setIsActive] = useState(admin ? !!admin.isActive : true)
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  const isEdit = !!admin

  const handleBlur = (field, value) => {
    let error = ''
    if (field === 'name' && !value.trim()) {
      error = 'Full name is required'
    } else if (field === 'email') {
      if (!value.trim()) error = 'Email address is required'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Invalid email address'
    } else if (field === 'password' && !isEdit && (!value || value.length < 8)) {
      error = 'Password must be at least 8 characters long'
    } else if (field === 'confirmPassword' && value !== (isEdit ? newPassword : password)) {
      error = 'Passwords do not match'
    }
    setFieldErrors(prev => ({ ...prev, [field]: error || undefined }))
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')

    if (!name.trim() || !email.trim() || !role) {
      setErrorMsg('All fields are required.')
      return
    }

    if (!isEdit && !password) {
      setErrorMsg('Password is required.')
      return
    }

    if (!isEdit && password) {
      if (password.length < 8) {
        setErrorMsg('Password must be at least 8 characters long.')
        return
      }
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match.')
        return
      }
    }

    if (isEdit && showPasswordSection) {
      if (!newPassword) {
        setErrorMsg('New password is required for reset.')
        return
      }
      if (newPassword.length < 8) {
        setErrorMsg('Password must be at least 8 characters long.')
        return
      }
      if (newPassword !== confirmPassword) {
        setErrorMsg('Passwords do not match.')
        return
      }
    }

    setSubmitting(true)
    const payload = {
      name,
      email: email.toLowerCase(),
      role,
      isActive
    }
    if (!isEdit && password) {
      payload.password = password
    } else if (isEdit && showPasswordSection && newPassword) {
      payload.password = newPassword
    }

    try {
      const res = await fetch(
        isEdit ? `/api/admin/users/${admin._id}` : '/api/admin/users',
        {
          method: isEdit ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }
      )
      const data = await res.json()
      if (res.ok && data.success) {
        onSubmit()
      } else {
        setErrorMsg(data.error || 'Something went wrong')
      }
    } catch {
      setErrorMsg('Network error.')
    } finally {
      setSubmitting(false)
    }
  }

  // Filter roles: Only SUPER_ADMIN can assign SUPER_ADMIN role
  const availableRoles = [
    { value: 'SALES_EXECUTIVE', label: 'Sales Executive' },
    { value: 'SALES_MANAGER', label: 'Sales Manager' },
    { value: 'MARKETING_MANAGER', label: 'Marketing Manager' },
    { value: 'CONTENT_EDITOR', label: 'Content Editor' },
  ]
  if (currentAdmin?.role === 'SUPER_ADMIN') {
    availableRoles.push({ value: 'SUPER_ADMIN', label: 'Super Admin' })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div onClick={onClose} className="absolute inset-0 bg-black/40 backdrop-blur-xs" />

      {/* Modal Container */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 z-10 border border-gray-100 flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-3.5 mb-4">
          <h3 className="font-sans font-bold text-gray-900 text-base">
            {isEdit ? 'Update Team Member' : 'Add Team Member'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 cursor-pointer bg-transparent border-none outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error message */}
        {errorMsg && (
          <p className="font-mono text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-4 leading-relaxed">
            {errorMsg}
          </p>
        )}

        {/* Form fields */}
        <form onSubmit={handleFormSubmit} className="space-y-4">
          
          <div className="flex flex-col gap-1.5">
            <label htmlFor="user-name" className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">Full Name</label>
            <input
              id="user-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={(e) => handleBlur('name', e.target.value)}
              placeholder="e.g. Rajesh Kumar"
              autoComplete="name"
              required
              aria-invalid={fieldErrors.name ? 'true' : 'false'}
              aria-describedby={fieldErrors.name ? 'user-name-error' : undefined}
              className="px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white font-sans text-sm text-gray-900 outline-none focus:border-fg-blue w-full focus-visible:ring-2 focus-visible:ring-[#0E4FB3] focus-visible:ring-offset-2"
            />
            {fieldErrors.name && <p id="user-name-error" className="text-red-650 text-xs mt-1 font-sans">{fieldErrors.name}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="user-email" className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">Email Address</label>
            <input
              id="user-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={(e) => handleBlur('email', e.target.value)}
              placeholder="e.g. rajesh@company.com"
              autoComplete="email"
              required
              disabled={isEdit}
              aria-invalid={fieldErrors.email ? 'true' : 'false'}
              aria-describedby={fieldErrors.email ? 'user-email-error' : undefined}
              className="px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white font-sans text-sm text-gray-900 outline-none focus:border-fg-blue w-full disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-[#0E4FB3] focus-visible:ring-offset-2"
            />
            {fieldErrors.email && <p id="user-email-error" className="text-red-650 text-xs mt-1 font-sans">{fieldErrors.email}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="user-role" className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">Access Role</label>
            <select
              id="user-role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white font-sans text-sm outline-none focus:border-fg-blue w-full focus-visible:ring-2 focus-visible:ring-[#0E4FB3] focus-visible:ring-offset-2"
            >
              {availableRoles.map(r => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
          </div>

          {/* Password fields */}
          {!isEdit ? (
            <>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="user-password" className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">
                  Password
                </label>
                <input
                  id="user-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={(e) => handleBlur('password', e.target.value)}
                  placeholder="Password (min 8 chars)"
                  required
                  aria-invalid={fieldErrors.password ? 'true' : 'false'}
                  aria-describedby={fieldErrors.password ? 'user-password-error' : undefined}
                  className="px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white font-sans text-sm text-gray-900 outline-none focus:border-fg-blue w-full focus-visible:ring-2 focus-visible:ring-[#0E4FB3] focus-visible:ring-offset-2"
                />
                {fieldErrors.password && <p id="user-password-error" className="text-red-650 text-xs mt-1 font-sans">{fieldErrors.password}</p>}
              </div>

              {password.length > 0 && (
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="user-confirm-password" className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">Confirm Password</label>
                  <input
                    id="user-confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onBlur={(e) => handleBlur('confirmPassword', e.target.value)}
                    placeholder="Match password"
                    required
                    aria-invalid={fieldErrors.confirmPassword ? 'true' : 'false'}
                    aria-describedby={fieldErrors.confirmPassword ? 'user-confirm-password-error' : undefined}
                    className="px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white font-sans text-sm text-gray-900 outline-none focus:border-fg-blue w-full focus-visible:ring-2 focus-visible:ring-[#0E4FB3] focus-visible:ring-offset-2"
                  />
                  {fieldErrors.confirmPassword && <p id="user-confirm-password-error" className="text-red-650 text-xs mt-1 font-sans">{fieldErrors.confirmPassword}</p>}
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col gap-1 text-left select-none">
              <button
                type="button"
                onClick={() => setShowPasswordSection(!showPasswordSection)}
                className="text-[#0E4FB3] text-sm underline underline-offset-4 mt-2 mb-2 text-left cursor-pointer border-none bg-transparent outline-none self-start focus-visible:ring-2 focus-visible:ring-[#0E4FB3]"
              >
                {showPasswordSection ? 'Cancel password reset' : 'Reset password'}
              </button>

              {showPasswordSection && (
                <div className="mt-2 space-y-3 p-4 bg-[#F4F6F9] rounded-xl border border-[#E5E7EB]">
                  <label htmlFor="user-new-password" className="font-mono text-xs text-[#6B7280] uppercase tracking-widest m-0 font-bold block">
                    New Password
                  </label>
                  <input
                    id="user-new-password"
                    type="password"
                    placeholder="Minimum 8 characters"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    onBlur={(e) => handleBlur('password', e.target.value)}
                    className="w-full border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-sm bg-white outline-none focus:border-[#0E4FB3] focus-visible:ring-2 focus-visible:ring-[#0E4FB3] focus-visible:ring-offset-2"
                  />
                  {fieldErrors.password && <p className="text-red-650 text-xs font-sans mt-0.5">{fieldErrors.password}</p>}

                  <label htmlFor="user-confirm-new-password" className="font-mono text-xs text-[#6B7280] uppercase tracking-widest m-0 font-bold block mt-2">
                    Confirm New Password
                  </label>
                  <input
                    id="user-confirm-new-password"
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    onBlur={(e) => handleBlur('confirmPassword', e.target.value)}
                    className="w-full border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-sm bg-white outline-none focus:border-[#0E4FB3] focus-visible:ring-2 focus-visible:ring-[#0E4FB3] focus-visible:ring-offset-2"
                  />
                  {fieldErrors.confirmPassword && <p className="text-red-650 text-xs font-sans mt-0.5">{fieldErrors.confirmPassword}</p>}
                </div>
              )}
            </div>
          )}

          {/* Is Active Toggle */}
          {isEdit && (
            <div className="flex items-center gap-2 pt-1 border-t border-gray-100 select-none">
              <input
                type="checkbox"
                id="isActive"
                checked={isActive}
                disabled={admin?._id === currentAdmin?.id}
                onChange={(e) => setIsActive(e.target.checked)}
                className="rounded border-gray-300 text-fg-blue focus:ring-fg-blue disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E4FB3] focus-visible:ring-offset-2"
              />
              <label htmlFor="isActive" className="font-sans text-xs font-semibold text-gray-600 cursor-pointer select-none">
                Active System access
              </label>
            </div>
          )}

          {/* Buttons */}
          <div className="flex items-center gap-3 pt-4 select-none">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 font-sans text-sm font-semibold cursor-pointer outline-none bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E4FB3] focus-visible:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-2.5 bg-fg-blue hover:bg-fg-blue/90 text-white font-sans text-sm font-bold rounded-xl cursor-pointer border-none outline-none disabled:opacity-50 flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E4FB3] focus-visible:ring-offset-2"
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {isEdit ? 'Save Changes' : 'Create User'}
            </button>
          </div>

        </form>

      </div>
    </div>
  )
}
