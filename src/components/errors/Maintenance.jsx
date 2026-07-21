'use client'

import React from 'react'
import { Construction } from 'lucide-react'

export function Maintenance() {
  return (
    <div className="min-h-screen bg-[#F5F0EB] flex items-center justify-center px-6 py-12">
      <div className="bg-white border border-[#E8E2DA] rounded-[32px] p-10 text-center max-w-md w-full shadow-sm space-y-6">
        <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
          <Construction size={28} />
        </div>
        <div className="space-y-2">
          <h3 className="font-sans text-xl font-bold text-[#111111]">Under Scheduled Maintenance</h3>
          <p className="font-sans text-sm text-[#7A7A7A] leading-relaxed">
            We are performing standard system upgrades. Services will resume shortly.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Maintenance
