'use client'

import React from 'react'
import { ServerCrash } from 'lucide-react'

export function ServerError({ reset }) {
  return (
    <div className="min-h-screen bg-[#F5F0EB] flex items-center justify-center px-6 py-12">
      <div className="bg-white border border-[#E8E2DA] rounded-[32px] p-10 text-center max-w-md w-full shadow-sm space-y-6">
        <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
          <ServerCrash size={28} />
        </div>
        <div className="space-y-2">
          <h3 className="font-sans text-xl font-bold text-[#111111]">Internal Server Error</h3>
          <p className="font-sans text-sm text-[#7A7A7A] leading-relaxed">
            An unexpected error occurred. Our engineers have been alerted and are investigating.
          </p>
        </div>
        {reset && (
          <button
            onClick={reset}
            className="w-full py-3 rounded-full bg-[#0E4FB3] hover:bg-[#0b3c8a] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Attempt Recover
          </button>
        )}
      </div>
    </div>
  )
}

export default ServerError
