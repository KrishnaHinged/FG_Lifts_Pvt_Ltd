'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

const SessionContext = createContext(null)

export function SessionProvider({ children }) {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  // Verify session on client mount
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch('/api/admin/auth/session') // Session endpoint if exists
        if (res.ok) {
          const data = await res.json()
          if (data.success && data.admin) {
            setAdmin(data.admin)
          }
        }
      } catch (err) {
        console.error('Failed to resolve active admin session:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchSession()
  }, [])

  const logout = async () => {
    try {
      const res = await fetch('/api/admin/auth/logout', { method: 'POST' })
      if (res.ok) {
        setAdmin(null)
        window.location.href = '/admin/login'
      }
    } catch (err) {
      console.error('Session logout error:', err)
    }
  }

  return (
    <SessionContext.Provider value={{ admin, setAdmin, loading, logout, isAuthenticated: !!admin }}>
      {children}
    </SessionContext.Provider>
  )
}

export function useSession() {
  const context = useContext(SessionContext)
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider')
  }
  return context
}

export default SessionProvider
