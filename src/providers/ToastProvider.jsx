'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, CheckCircle2, AlertTriangle, AlertCircle, Info } from 'lucide-react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = useCallback(({ title, message, type = 'info', duration = 4000 }) => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9)
    setToasts((prev) => [...prev, { id, title, message, type, duration }])
    
    if (duration > 0) {
      setTimeout(() => {
        dismiss(id)
      }, duration)
    }
  }, [dismiss])

  const success = useCallback((message, title = 'Success') => toast({ title, message, type: 'success' }), [toast])
  const error = useCallback((message, title = 'Error') => toast({ title, message, type: 'error' }), [toast])
  const warning = useCallback((message, title = 'Warning') => toast({ title, message, type: 'warning' }), [toast])
  const info = useCallback((message, title = 'Info') => toast({ title, message, type: 'info' }), [toast])

  const icons = {
    success: <CheckCircle2 className="h-5 w-5 text-emerald-600" />,
    error: <AlertCircle className="h-5 w-5 text-red-600" />,
    warning: <AlertTriangle className="h-5 w-5 text-amber-600" />,
    info: <Info className="h-5 w-5 text-blue-600" />
  }

  const borderColors = {
    success: 'border-emerald-200 bg-emerald-50/95',
    error: 'border-red-200 bg-red-50/95',
    warning: 'border-amber-200 bg-amber-50/95',
    info: 'border-blue-200 bg-blue-50/95'
  }

  return (
    <ToastContext.Provider value={{ toast, success, error, warning, info, dismiss }}>
      {children}
      {/* Toast Portal/Container overlay */}
      <div className="fixed bottom-6 right-6 z-[99999] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl border shadow-lg backdrop-blur-md ${borderColors[t.type]}`}
            >
              <div className="flex-shrink-0 mt-0.5">{icons[t.type]}</div>
              <div className="flex-1 min-w-0">
                {t.title && <h5 className="font-sans text-xs font-bold text-neutral-900 uppercase tracking-wider">{t.title}</h5>}
                <p className="font-sans text-xs text-neutral-700 mt-1 leading-relaxed">{t.message}</p>
              </div>
              <button
                onClick={() => dismiss(t.id)}
                className="flex-shrink-0 text-neutral-400 hover:text-neutral-950 transition-colors p-0.5 rounded-full"
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export default ToastProvider
