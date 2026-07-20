'use client'

import { useEffect, useRef } from 'react'

export default function ConfirmModal({
  isOpen,
  onConfirm,
  onCancel,
  title,
  description,
  confirmLabel = 'Delete',
  isDangerous = true,
  isSubmitting = false
}) {
  const dialogRef = useRef(null)
  const cancelBtnRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen) {
      // Prevent double showModal calls
      if (!dialog.open) {
        dialog.showModal()
      }
      // Focus the cancel button to prevent accidental deletion
      if (cancelBtnRef.current) {
        cancelBtnRef.current.focus()
      }
    } else {
      if (dialog.open) {
        dialog.close()
      }
    }
  }, [isOpen])

  // Support escape key close
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const handleCancel = (e) => {
      e.preventDefault()
      onCancel()
    }

    dialog.addEventListener('cancel', handleCancel)
    return () => {
      dialog.removeEventListener('cancel', handleCancel)
    }
  }, [onCancel])

  if (!isOpen) return null

  return (
    <dialog
      ref={dialogRef}
      className="border-none rounded-2xl p-6 bg-white shadow-2xl w-full max-w-md backdrop:bg-black/45 backdrop:backdrop-blur-xs focus:outline-none"
    >
      <div className="flex flex-col gap-4 font-sans select-none">
        <div>
          <h3 className="text-base font-bold text-gray-900 m-0">
            {title}
          </h3>
          <p className="text-xs text-gray-500 mt-2 leading-relaxed m-0">
            {description}
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            ref={cancelBtnRef}
            type="button"
            onClick={onCancel}
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
                <svg className="animate-spin h-3.5 w-3.5 text-white animate-infinite" fill="none" viewBox="0 0 24 24">
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
    </dialog>
  )
}
