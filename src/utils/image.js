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

export default {
  getImageDimensions,
  compressImageUrl
}
