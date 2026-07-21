'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

const NavigationContext = createContext(null)

export function NavigationProvider({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const openMobileMenu = () => setMobileMenuOpen(true)
  const closeMobileMenu = () => setMobileMenuOpen(false)
  const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev)

  const openSidebar = () => setSidebarOpen(true)
  const closeSidebar = () => setSidebarOpen(false)
  const toggleSidebar = () => setSidebarOpen(prev => !prev)

  // Auto-close menu overlays on navigation
  useEffect(() => {
    setMobileMenuOpen(false)
    setSidebarOpen(false)
  }, [pathname])

  return (
    <NavigationContext.Provider
      value={{
        mobileMenuOpen,
        openMobileMenu,
        closeMobileMenu,
        toggleMobileMenu,
        sidebarOpen,
        openSidebar,
        closeSidebar,
        toggleSidebar
      }}
    >
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider')
  }
  return context
}

export default NavigationProvider
