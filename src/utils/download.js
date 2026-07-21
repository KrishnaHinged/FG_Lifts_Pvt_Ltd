/**
 * File downloading utility.
 */

export function downloadFile(content, fileName, contentType = 'text/plain') {
  if (typeof window === 'undefined') return
  const blob = new Blob([content], { type: contentType })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = fileName
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export function downloadCSV(csvContent, fileName = 'export.csv') {
  downloadFile(csvContent, fileName, 'text/csv;charset=utf-8;')
}

export function downloadJSON(jsonObject, fileName = 'export.json') {
  downloadFile(JSON.stringify(jsonObject, null, 2), fileName, 'application/json')
}

export default {
  downloadFile,
  downloadCSV,
  downloadJSON
}
