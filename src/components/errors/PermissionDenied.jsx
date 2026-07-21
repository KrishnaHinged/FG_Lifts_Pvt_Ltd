'use client'

import React from 'react'
import { ShieldAlert } from 'lucide-react'
import Link from 'next/link'

export function PermissionDenied() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="bg-white border border-[#E8E2DA] rounded-[32px] p-10 text-center max-w-md w-full shadow-sm space-y-6">
        <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
          <ShieldAlert size={28} />
        </div>
        <div className="space-y-2">
          <h3 className="font-sans text-lg font-bold text-[#111111]">Access Denied</h3>
          <p className="font-sans text-sm text-[#7A7A7A] leading-relaxed">
            Your user account credentials have insufficient authority levels to access this page.
          </p>
        </div>
        <Link
          href="/admin/login"
          className="block w-full py-3 rounded-full bg-[#0E4FB3] hover:bg-[#0b3c8a] text-white text-xs font-bold uppercase tracking-wider transition-colors no-underline"
        >
          Return to Login
        </Link>
      </div>
    </div>
  )
}

export default PermissionDenied
