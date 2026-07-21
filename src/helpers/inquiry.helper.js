/**
 * Project-specific CRM Inquiry helper.
 */

export function getStatusColor(status) {
  const colors = {
    New: 'bg-blue-50 text-blue-700 border-blue-200',
    Contacted: 'bg-amber-50 text-amber-700 border-amber-200',
    Qualified: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Closed: 'bg-neutral-100 text-neutral-700 border-neutral-200',
    Rejected: 'bg-red-50 text-red-700 border-red-200'
  }
  return colors[status] || colors.New
}

export function getStatusLabel(status) {
  const labels = {
    New: 'New Lead',
    Contacted: 'In Discussion',
    Qualified: 'Qualified Deal',
    Closed: 'Closed Deal',
    Rejected: 'Rejected / Dead'
  }
  return labels[status] || status
}

export function formatInquiryReference(inquiry) {
  if (!inquiry || !inquiry.id) return ''
  return `FG-${inquiry.id.slice(-6).toUpperCase()}`
}

export default {
  getStatusColor,
  getStatusLabel,
  formatInquiryReference
}
