'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'

const ModalContext = createContext(null)

export function ModalProvider({ children }) {
  const [modalStack, setModalStack] = useState([])

  const openModal = useCallback((component, props = {}) => {
    setModalStack((prev) => [...prev, { id: Date.now() + Math.random().toString(36).substr(2, 9), component, props }])
  }, [])

  const closeModal = useCallback(() => {
    setModalStack((prev) => prev.slice(0, -1))
  }, [])

  const closeAllModals = useCallback(() => {
    setModalStack([])
  }, [])

  // Handle escape key to dismiss top modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && modalStack.length > 0) {
        closeModal()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [modalStack, closeModal])

  return (
    <ModalContext.Provider value={{ modalStack, openModal, closeModal, closeAllModals }}>
      {children}
      {/* Render current modals in the stack */}
      {modalStack.map((m, index) => {
        const ModalComponent = m.component
        return (
          <ModalComponent
            key={m.id}
            isOpen={true}
            onClose={closeModal}
            {...m.props}
          />
        )
      })}
    </ModalContext.Provider>
  )
}

export function useModal() {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}

export default ModalProvider
