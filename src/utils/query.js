import { buildQueryString } from './url.js'

/**
 * Clean API request builder and response parsing helper.
 */

export async function parseApiResponse(response) {
  const contentType = response.headers.get('content-type') || ''
  let payload = null

  if (contentType.includes('application/json')) {
    payload = await response.json()
  } else {
    payload = await response.text()
  }

  if (!response.ok) {
    throw {
      status: response.status,
      message: payload?.error || payload?.message || 'API request failed'
    }
  }

  return payload
}

export async function buildApiUrl(endpoint, params = {}) {
  return `${endpoint}${buildQueryString(params)}`
}

export default {
  parseApiResponse,
  buildApiUrl
}
