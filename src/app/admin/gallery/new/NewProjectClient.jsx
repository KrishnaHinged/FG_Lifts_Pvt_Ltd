'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import GalleryProjectForm from '@/components/admin/GalleryProjectForm'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NewProjectClient({ products = [] }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (payload) => {
    setIsLoading(true)
    setErrorMsg('')
    try {
      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        router.push('/admin/gallery')
        router.refresh()
      } else {
        setErrorMsg(data.error || 'Failed to create showcase project.')
      }
    } catch {
      setErrorMsg('Network error.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6 select-none">
      
      {/* Header bar */}
      <div className="flex items-center gap-3">
        <Link
          href="/admin/gallery"
          className="p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-500 hover:text-gray-900 cursor-pointer transition-colors inline-block"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <h1 className="font-sans font-bold text-gray-900 text-2xl tracking-tight leading-none m-0">
          Create Showcase Project
        </h1>
      </div>

      {/* Error message */}
      {errorMsg && (
        <div className="bg-red-50 border border-red-100 text-red-700 font-mono text-xs px-4 py-2.5 rounded-xl max-w-4xl mx-auto leading-relaxed">
          {errorMsg}
        </div>
      )}

      {/* Form manager */}
      <GalleryProjectForm
        products={products}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />

    </div>
  )
}
