/**
 * @fileoverview Data contract for form input models.
 */

/**
 * @typedef {Object} ContactFormData
 * @property {string} name - User full name.
 * @property {string} email - Email address.
 * @property {string} phone - Contact number.
 * @property {string} [company] - Corporate affiliation.
 * @property {string} [city] - Operating city.
 * @property {string} [elevatorType] - Elevator type selector option.
 * @property {string} [floorCount] - Number of floor stops option.
 * @property {string} [message] - Descriptive message.
 */

/**
 * @typedef {Object} NewsletterFormData
 * @property {string} email - Email input for subscription.
 * @property {string} [name] - Optional name.
 */

/**
 * @typedef {Object} LoginFormData
 * @property {string} email - Log-in administrative email.
 * @property {string} password - Clear-text verification password.
 */

export const FormsContract = {
  email: '',
  name: '',
  password: ''
}
export default FormsContract
