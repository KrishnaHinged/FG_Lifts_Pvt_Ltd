'use client'

import React, { createContext, useContext, useState } from 'react'

const CursorContext = createContext(null)

export function CursorProvider({ children }) {
  const [cursorType, setCursorType] = useState('default') // default | hover | arrow | hidden
  const [cursorProps, setCursorProps] = useState({})

  const showCursor = (type = 'default', props = {}) => {
    setCursorType(type)
    setCursorProps(props)
  }

  const resetCursor = () => {
    setCursorType('default')
    setCursorProps({})
  }

  return (
    <CursorContext.Provider value={{ cursorType, cursorProps, showCursor, resetCursor }}>
      {children}
    </CursorContext.Provider>
  )
}

export function useCursor() {
  const context = useContext(CursorContext)
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider')
  }
  return context
}

export default CursorProvider
