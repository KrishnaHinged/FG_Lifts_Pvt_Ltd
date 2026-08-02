/**
 * Performance Timing & Measure Utility
 * FG Lifts Pvt. Ltd.
 */

export function markAndMeasure(markName, startMark, endMark) {
  if (typeof window === 'undefined' || !window.performance) return

  try {
    if (startMark && endMark) {
      window.performance.measure(markName, startMark, endMark)
      const entries = window.performance.getEntriesByName(markName)
      return entries[entries.length - 1]?.duration
    } else {
      window.performance.mark(markName)
    }
  } catch {
    // Ignore measurement errors
  }
}

export default markAndMeasure
