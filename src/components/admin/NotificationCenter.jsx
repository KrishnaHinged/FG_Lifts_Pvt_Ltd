'use client'

import { useState } from 'react'
import { Bell, Check, Trash2, X, Info, AlertTriangle, CheckCircle } from 'lucide-react'

const sampleNotifications = [
  { id: 1, title: 'New CRM Lead', message: 'Passenger elevator inquiry submitted by Commercial Builders.', time: '10m ago', type: 'info', read: false },
  { id: 2, title: 'System Audit', message: 'New user account provisioned for Sales Executive.', time: '1h ago', type: 'success', read: false },
  { id: 3, title: 'Outbox Alert', message: '2 email notifications pending delivery in worker queue.', time: '3h ago', type: 'warning', read: true }
]

export default function NotificationCenter({ isOpen, onClose }) {
  const [notifications, setNotifications] = useState(sampleNotifications)

  if (!isOpen) return null

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const clearAll = () => {
    setNotifications([])
  }

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-2xl border-l border-[#E8E2DA] flex flex-col select-none animate-in slide-in-from-right duration-200">
      
      {/* Header */}
      <div className="p-4 border-b border-[#E8E2DA] flex items-center justify-between bg-neutral-50">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-[#0E4FB3]" />
          <h3 className="font-sans font-bold text-[#111111] text-sm leading-none">Notifications</h3>
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
          notifications.map((n) => (
            <div key={n.id} className={`p-4 flex items-start gap-3 transition-colors ${!n.read ? 'bg-[#0E4FB3]/5' : 'bg-white'}`}>
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
                <div className="flex items-center justify-between">
                  <h4 className="font-sans font-bold text-xs text-[#111111] truncate">{n.title}</h4>
                  <span className="font-mono text-[9px] text-[#7A7A7A]">{n.time}</span>
                </div>
                <p className="font-sans text-xs text-[#555555] mt-1 leading-snug">{n.message}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-xs font-mono text-[#7A7A7A]">
            No notifications available.
          </div>
        )}
      </div>

    </div>
  )
}
