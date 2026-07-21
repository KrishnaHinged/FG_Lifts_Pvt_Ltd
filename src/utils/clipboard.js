/**
 * Clipboard operations utility.
 */
export async function copyToClipboard(text) {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch (err) {
      console.error('Clipboard write error:', err)
      return false
    }
  }
  return false
}

export default copyToClipboard
