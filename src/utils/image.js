/**
 * Image processing utilities.
 */

export function getImageDimensions(file) {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return resolve({ width: 0, height: 0 })
    const img = new Image()
    img.src = URL.createObjectURL(file)
    img.onload = () => {
      resolve({ width: img.width, height: img.height })
      URL.revokeObjectURL(img.src)
    }
    img.onerror = (err) => reject(err)
  })
}

export function compressImageUrl(url, options = {}) {
  // Simple resolution mapping helper for systems supporting dynamic CDNs.
  // For static storage, returns original path.
  return url
}

export function compressImage(dataUrl, maxDimension = 1200, quality = 0.7) {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !dataUrl || !dataUrl.startsWith('data:image/')) {
      resolve(dataUrl)
      return
    }

    const img = new window.Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      let width = img.naturalWidth
      let height = img.naturalHeight

      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = Math.round((height * maxDimension) / width)
          width = maxDimension
        } else {
          width = Math.round((width * maxDimension) / height)
          height = maxDimension
        }
      }

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, width, height)

      const compressedDataUrl = canvas.toDataURL('image/jpeg', quality)
      resolve(compressedDataUrl)
    }
    img.onerror = () => {
      resolve(dataUrl)
    }
    img.src = dataUrl
  })
}

export default {
  getImageDimensions,
  compressImageUrl,
  compressImage
}
