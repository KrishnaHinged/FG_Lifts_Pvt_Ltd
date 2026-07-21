'use client'

import React from 'react'
import ThemeProvider from './ThemeProvider'
import ViewportProvider from './ViewportProvider'
import AnimationProvider from './AnimationProvider'
import ScrollProvider from './ScrollProvider'
import LenisProvider from './LenisProvider'
import CursorProvider from './CursorProvider'
import SessionProvider from './SessionProvider'
import NavigationProvider from './NavigationProvider'
import ModalProvider from './ModalProvider'
import ToastProvider from './ToastProvider'
import LoadingProvider from './LoadingProvider'

export function AppProvider({ children }) {
  return (
    <ViewportProvider>
      <ThemeProvider>
        <AnimationProvider>
          <ScrollProvider>
            <LenisProvider>
              <CursorProvider>
                <SessionProvider>
                  <NavigationProvider>
                    <ModalProvider>
                      <ToastProvider>
                        <LoadingProvider>
                          {children}
                        </LoadingProvider>
                      </ToastProvider>
                    </ModalProvider>
                  </NavigationProvider>
                </SessionProvider>
              </CursorProvider>
            </LenisProvider>
          </ScrollProvider>
        </AnimationProvider>
      </ThemeProvider>
    </ViewportProvider>
  )
}

export default AppProvider
