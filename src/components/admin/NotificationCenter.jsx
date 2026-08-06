'use client'

import { useState, useEffect, useCallback, memo } from 'react'
import { useRouter } from 'next/navigation'
import { Bell, Trash2, X, Info, AlertTriangle, CheckCircle, RefreshCw, ExternalLink } from 'lucide-react'

function timeAgo(dateString) {
  if (!dateString) return 'Just now'
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now - date) / 1000)
  if (isNaN(seconds) || seconds < 30) return 'Just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

export default memo(function NotificationCenter({ isOpen, onClose, onUnreadCountChange }) {
  const router = useRouter()
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(false)
  const [readIds, setReadIds] = useState(new Set())

  // Fetch real-time inquiries & audit logs from server API
  const fetchRealTimeNotifications = useCallback(async () => {
    try {
      setLoading(true)
      const [inquiriesRes, logsRes] = await Promise.allSettled([
        fetch('/api/admin/inquiries'),
        fetch('/api/admin/logs?limit=5')
      ])

      const list = []

      // 1. Convert Inquiries into notifications
      if (inquiriesRes.status === 'fulfilled' && inquiriesRes.value.ok) {
        const data = await inquiriesRes.value.json()
        const inquiries = data.inquiries || []
        inquiries.slice(0, 8).forEach((inq) => {
          const isNew = inq.status === 'New'
          list.push({
            id: `inq-${inq._id || inq.id}`,
            title: isNew ? '🔥 New CRM Lead' : `Lead (${inq.status || 'Updated'})`,
            message: `${inq.name || 'Anonymous'} — ${inq.elevatorType || 'Elevator System'} (${inq.city || 'Unspecified location'})`,
            time: timeAgo(inq.createdAt),
            rawDate: inq.createdAt ? new Date(inq.createdAt) : new Date(),
            type: isNew ? 'info' : 'success',
            link: '/admin/inquiries',
            isNew,
          })
        })
      }

      // 2. Convert Audit logs into notifications
      if (logsRes.status === 'fulfilled' && logsRes.value.ok) {
        const logData = await logsRes.value.json()
        const logs = logData.logs || []
        logs.slice(0, 5).forEach((log) => {
          list.push({
            id: `log-${log._id || log.id}`,
            title: '⚡ System Audit',
            message: `${(log.action || 'system_event').replace(/_/g, ' ').toUpperCase()} by ${log.performedBy?.name || 'Admin'}`,
            time: timeAgo(log.createdAt),
            rawDate: log.createdAt ? new Date(log.createdAt) : new Date(),
            type: 'warning',
            link: '/admin/logs',
            isNew: false,
          })
        })
      }

      // Sort by newest date first
      list.sort((a, b) => b.rawDate - a.rawDate)

      setNotifications(list)

      // Notify parent topbar of new unread count
      const unreadCount = list.filter(n => !readIds.has(n.id) && (n.isNew || n.type === 'info')).length
      if (onUnreadCountChange) {
        onUnreadCountChange(unreadCount)
      }
    } catch (err) {
      console.error('Error fetching real-time notifications:', err)
    } finally {
      setLoading(false)
    }
  }, [readIds, onUnreadCountChange])

  // Real-time polling every 8 seconds
  useEffect(() => {
    fetchRealTimeNotifications()
    const interval = setInterval(() => {
      fetchRealTimeNotifications()
    }, 8000)
    return () => clearInterval(interval)
  }, [fetchRealTimeNotifications])

  if (!isOpen) return null

  const markAllRead = () => {
    const allIds = new Set(notifications.map(n => n.id))
    setReadIds(allIds)
    if (onUnreadCountChange) onUnreadCountChange(0)
  }

  const clearAll = () => {
    setNotifications([])
    if (onUnreadCountChange) onUnreadCountChange(0)
  }

  const handleNotificationClick = (item) => {
    setReadIds(prev => new Set(prev).add(item.id))
    if (item.link) {
      router.push(item.link)
      onClose()
    }
  }

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-2xl border-l border-[#E8E2DA] flex flex-col select-none animate-in slide-in-from-right duration-200">
      
      {/* Header */}
      <div className="p-4 border-b border-[#E8E2DA] flex items-center justify-between bg-neutral-50">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-[#0E4FB3]" />
          <h3 className="font-sans font-bold text-[#111111] text-sm leading-none m-0">Live Notifications</h3>
          {loading && <RefreshCw className="w-3 h-3 text-[#0E4FB3] animate-spin ml-1" />}
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-[#7A7A7A] hover:text-[#111111] bg-transparent border-none outline-none cursor-pointer"
        >
          <X size={16} />
        </button>
      </div>

      {/* Actions */}
      <div className="px-4 py-2 bg-[#EDE8E2]/30 border-b border-[#E8E2DA] flex items-center justify-between text-[11px] font-sans">
        <button onClick={markAllRead} className="text-[#0E4FB3] hover:underline font-semibold bg-transparent border-none cursor-pointer">
          Mark all as read
        </button>
        <button onClick={clearAll} className="text-[#7A7A7A] hover:text-red-600 font-semibold bg-transparent border-none cursor-pointer flex items-center gap-1">
          <Trash2 size={12} /> Clear
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto divide-y divide-[#E8E2DA]">
        {notifications.length > 0 ? (
          notifications.map((n) => {
            const isRead = readIds.has(n.id)
            return (
              <div
                key={n.id}
                onClick={() => handleNotificationClick(n)}
                className={`p-4 flex items-start gap-3 transition-colors cursor-pointer hover:bg-neutral-50 ${
                  !isRead && n.isNew ? 'bg-[#0E4FB3]/5 border-l-2 border-l-[#0E4FB3]' : 'bg-white'
                }`}
              >
                <div className="mt-0.5 flex-shrink-0">
                  {n.type === 'warning' ? (
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                  ) : n.type === 'success' ? (
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Info className="w-4 h-4 text-blue-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="font-sans font-bold text-xs text-[#111111] truncate m-0 flex items-center gap-1">
                      <span>{n.title}</span>
                      <ExternalLink className="w-3 h-3 text-neutral-400" />
                    </h4>
                    <span className="font-mono text-[9px] text-[#7A7A7A] flex-shrink-0">{n.time}</span>
                  </div>
                  <p className="font-sans text-xs text-[#555555] mt-1 leading-snug m-0">{n.message}</p>
                </div>
              </div>
            )
          })
        ) : (
          <div className="p-8 text-center text-xs font-mono text-[#7A7A7A]">
            No new notifications available.
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="p-3 bg-neutral-50 border-t border-[#E8E2DA] text-center">
        <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">
          Real-Time Sync Active · Polls every 8s
        </span>
      </div>

    </div>
  )
})
