'use client'

import { useEffect, useRef, useCallback } from 'react'

export default function ConfirmModal({
  isOpen,
  onConfirm,
  onCancel,
  onClose,
  title,
  description,
  message,
  confirmLabel = 'Delete',
  isDangerous = true,
  isSubmitting = false
}) {
  // Support both prop name variants
  const handleClose = useCallback(() => {
    if (onCancel) onCancel()
    else if (onClose) onClose()
  }, [onCancel, onClose])

  const descriptionText = description || message || ''

  const overlayRef = useRef(null)
  const cancelBtnRef = useRef(null)

  // Focus cancel button on open & lock body scroll
  useEffect(() => {
    if (isOpen) {
      cancelBtnRef.current?.focus()
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, handleClose])

  if (!isOpen) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === overlayRef.current) handleClose()
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-xs" />

      {/* Modal Card */}
      <div
        className="relative bg-white rounded-2xl p-6 shadow-2xl w-full max-w-md animate-in zoom-in-95 fade-in duration-200"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        aria-describedby="confirm-modal-desc"
      >
        <div className="flex flex-col gap-4 font-sans select-none">
          <div>
            <h3
              id="confirm-modal-title"
              className="text-base font-bold text-gray-900 m-0"
            >
              {title}
            </h3>
            {descriptionText && (
              <p
                id="confirm-modal-desc"
                className="text-xs text-gray-500 mt-2 leading-relaxed m-0"
              >
                {descriptionText}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              ref={cancelBtnRef}
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 cursor-pointer disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E4FB3] focus-visible:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isSubmitting}
              className={`px-4 py-2 rounded-lg text-xs font-semibold text-white cursor-pointer disabled:opacity-40 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                isDangerous 
                  ? 'bg-red-600 hover:bg-red-700 focus-visible:ring-red-500' 
                  : 'bg-fg-blue hover:bg-fg-blue/90 focus-visible:ring-[#0E4FB3]'
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Processing...</span>
                </>
              ) : (
                confirmLabel
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

