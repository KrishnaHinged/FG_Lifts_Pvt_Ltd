export const MESSAGES = Object.freeze({
  SUCCESS: Object.freeze({
    INQUIRY_CREATED: 'Thank you. Your inquiry has been logged successfully.',
    SUBSCRIBED: 'You have been successfully added to our mailing list.',
    GENERIC: 'Action completed successfully.'
  }),
  ERROR: Object.freeze({
    GENERIC: 'An unexpected system error occurred. Please try again.',
    UNAUTHORIZED: 'Access denied. Please authenticate to view this page.',
    FORBIDDEN: 'Access forbidden. Insufficient permissions.',
    NOT_FOUND: 'The requested resource could not be located.'
  })
})

export default MESSAGES
