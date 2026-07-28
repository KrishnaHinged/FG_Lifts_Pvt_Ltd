/**
 * Upload a base64 data URL image to the media API and return the served URL.
 * Falls back to returning the original data URL if upload fails.
 * 
 * @param {string} dataUrl - The base64 data URL (e.g. "data:image/jpeg;base64,...")
 * @param {string} [filename] - Optional filename for the upload
 * @param {string} [context] - Optional context tag (e.g. '360-texture', 'product-photo')
 * @returns {Promise<string>} The served URL (e.g. "/api/media/abc123") or the original data URL on failure
 */
export async function uploadImageToMedia(dataUrl, filename, context) {
  // Only upload base64 data URLs, not regular URLs
  if (!dataUrl || !dataUrl.startsWith('data:image/')) {
    return dataUrl
  }

  try {
    const res = await fetch('/api/admin/media/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: dataUrl,
        filename: filename || `upload-${Date.now()}.jpg`,
        context: context || 'general',
      }),
    })

    if (!res.ok) {
      console.warn('Image upload failed, using inline data URL as fallback')
      return dataUrl
    }

    const result = await res.json()
    return result.url || dataUrl
  } catch (err) {
    console.warn('Image upload error, using inline data URL as fallback:', err)
    return dataUrl
  }
}

/**
 * Check if a string is a base64 data URL
 */
export function isBase64DataUrl(str) {
  return typeof str === 'string' && str.startsWith('data:image/')
}
