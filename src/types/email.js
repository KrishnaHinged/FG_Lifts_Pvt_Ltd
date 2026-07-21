/**
 * @fileoverview Data contract for the email queue and templates.
 */

/**
 * @typedef {Object} EmailQueueItem
 * @property {string} [id] - Unique Database Identifier.
 * @property {string} to - Destination recipient email.
 * @property {string} subject - Email subject text.
 * @property {string} body - Compiled HTML body content.
 * @property {'pending'|'sent'|'failed'} status - Current delivery state.
 * @property {number} attempts - Number of dispatch attempts.
 * @property {string|Date|null} [lastAttemptAt] - Timestamp of last dispatch run.
 * @property {string} [error] - String trace of error if failed.
 * @property {string} [templateName] - Template key name used.
 * @property {string} [relatedId] - Reference ID of the triggering model (e.g. Inquiry ID).
 * @property {string|Date|null} [sentAt] - Success dispatch timestamp.
 */

/**
 * @typedef {Object} EmailTemplate
 * @property {string} [id] - Unique Database Identifier.
 * @property {string} name - Uniquely matched key name (e.g. "inquiry_received").
 * @property {string} subject - Raw compilation subject.
 * @property {string} body - HTML blueprint with double curly braces (e.g. {{name}}).
 * @property {string} [description] - Admin description.
 */

export const EmailQueueItemContract = {
  status: 'pending',
  attempts: 0,
  lastAttemptAt: null,
  error: null,
  sentAt: null
}

export const EmailTemplateContract = {
  name: '',
  subject: '',
  body: '',
  description: ''
}
