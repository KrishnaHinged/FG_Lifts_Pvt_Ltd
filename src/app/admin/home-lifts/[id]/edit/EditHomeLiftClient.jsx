'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import HomeLiftForm from '@/components/admin/HomeLiftForm'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { uploadImageToMedia, isBase64DataUrl } from '@/utils/mediaUpload'

/**
 * Walk through the product payload and upload all base64 data URL images
 * to the media API, replacing them with served URLs.
 */
async function uploadAllInlineImages(payload) {
  const result = { ...payload }

  // Upload product gallery images
  if (result.images && result.images.length > 0) {
    result.images = await Promise.all(
      result.images.map(async (img) => {
        if (isBase64DataUrl(img.url)) {
          const url = await uploadImageToMedia(img.url, `product-photo-${Date.now()}.jpg`, 'product-photo')
          return { ...img, url }
        }
        return img
      })
    )
  }

  return result
}

export default function EditHomeLiftClient({ product }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [statusMsg, setStatusMsg] = useState('')

  const handleSubmit = async (payload) => {
    setIsLoading(true)
    setErrorMsg('')
    setStatusMsg('')

    try {
      // Step 1: Upload all base64 images to media storage first
      setStatusMsg('Uploading images...')
      const cleanPayload = await uploadAllInlineImages(payload)

      // Step 2: Save the product with lightweight URL references
      setStatusMsg('Saving product details...')
      const res = await fetch(`/api/admin/products/${product._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanPayload),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        router.push('/admin/home-lifts')
        router.refresh()
      } else {
        setErrorMsg(data.error || 'Failed to update product details.')
      }
    } catch {
      setErrorMsg('Network error.')
    } finally {
      setIsLoading(false)
      setStatusMsg('')
    }
  }

  return (
    <div className="space-y-6 select-none">
      
      {/* Header bar */}
      <div className="flex items-center gap-3">
        <Link
          href="/admin/home-lifts"
          className="p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-500 hover:text-gray-900 cursor-pointer transition-colors inline-block"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <h1 className="font-sans font-bold text-gray-900 text-2xl tracking-tight leading-none m-0">
          Edit Home Lift: {product.name}
        </h1>
      </div>

      {/* Status message */}
      {statusMsg && (
        <div className="bg-blue-50 border border-blue-100 text-blue-700 font-mono text-xs px-4 py-2.5 rounded-xl max-w-4xl mx-auto leading-relaxed flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-blue-300 border-t-blue-700 rounded-full animate-spin shrink-0" />
          {statusMsg}
        </div>
      )}

      {/* Error message */}
      {errorMsg && (
        <div className="bg-red-50 border border-red-100 text-red-700 font-mono text-xs px-4 py-2.5 rounded-xl max-w-4xl mx-auto leading-relaxed">
          {errorMsg}
        </div>
      )}

      {/* Form manager */}
      <HomeLiftForm
        product={product}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />

    </div>
  )
}
