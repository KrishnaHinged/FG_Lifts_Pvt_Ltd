'use client'

import React from 'react'
import { WifiOff } from 'lucide-react'
import ErrorCard from './ErrorCard'

export function OfflineState() {
  const handleReload = () => {
    if (typeof window !== 'undefined') window.location.reload()
  }

  return (
    <div className="min-h-[50vh] flex items-center justify-center px-6">
      <div className="bg-white border border-[#E8E2DA] rounded-[32px] p-8 text-center max-w-md w-full shadow-sm space-y-6">
        <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
          <WifiOff size={28} />
        </div>
        <div className="space-y-2">
          <h3 className="font-sans text-lg font-bold text-[#111111]">Offline</h3>
          <p className="font-sans text-sm text-[#7A7A7A] leading-relaxed">
            Please check your internet connection and try reloading the page.
          </p>
        </div>
        <button
          onClick={handleReload}
          className="w-full py-3 rounded-full bg-[#0E4FB3] hover:bg-[#0b3c8a] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
        >
          Check Connection
        </button>
      </div>
    </div>
  )
}

export default OfflineState
