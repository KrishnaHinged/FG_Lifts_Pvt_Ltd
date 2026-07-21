'use client'

import { useCursor as useProviderCursor } from '@/providers/CursorProvider'

export function useCursor() {
  const { cursorType, cursorProps, showCursor, resetCursor } = useProviderCursor()
  return { cursorType, cursorProps, showCursor, resetCursor }
}

export default useCursor
