/**
 * @fileoverview Data contract for newsletter subscribers.
 */

/**
 * @typedef {Object} Subscriber
 * @property {string} [id] - Unique Database Identifier.
 * @property {string} email - Unique subscriber email address.
 * @property {string} [name] - Subscriber name.
 * @property {string} source - Source form location (e.g. Footer Form).
 * @property {boolean} isActive - True if opted in, false if unsubscribed.
 * @property {string|Date|null} [confirmedAt] - Subscription confirmation timestamp.
 * @property {string|Date|null} [unsubscribedAt] - Cancellation timestamp.
 * @property {string|Date} [createdAt] - Record creation timestamp.
 */

export const SubscriberContract = {
  email: '',
  name: '',
  source: 'Footer Form',
  isActive: true,
  confirmedAt: null,
  unsubscribedAt: null
}

export default SubscriberContract
