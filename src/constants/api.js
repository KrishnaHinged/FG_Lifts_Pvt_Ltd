export const API = Object.freeze({
  HEADERS: Object.freeze({
    JSON: Object.freeze({ 'Content-Type': 'application/json' })
  }),
  METHODS: Object.freeze({
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE'
  }),
  TIMEOUT_MS: 15000
})

export default API
