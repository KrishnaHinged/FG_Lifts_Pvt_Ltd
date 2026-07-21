import companyConfig from '@/config/company'

/**
 * Project-specific Contact communication links generator.
 */

export function buildWhatsAppUrl(message = '') {
  const rawPhone = companyConfig.phone.replace(/[^\d+]/g, '')
  const encodedText = encodeURIComponent(message || `Hi ${companyConfig.shortName}, I would like to inquire about your passenger and capsule elevators.`)
  return `https://wa.me/${rawPhone}?text=${encodedText}`
}

export function buildMailtoUrl(subject = '', body = '') {
  const to = companyConfig.emails.sales
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function buildMapsUrl() {
  return companyConfig.mapsUrl
}

export default {
  buildWhatsAppUrl,
  buildMailtoUrl,
  buildMapsUrl
}
