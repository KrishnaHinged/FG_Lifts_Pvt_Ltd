/**
 * @fileoverview Data contract for corporate metadata configurations.
 */

/**
 * @typedef {Object} AddressInfo
 * @property {string} street - Street details (e.g. "FG Towers, Ring Road").
 * @property {string} city - Headquarters city (e.g. "Surat").
 * @property {string} state - Headquarters state (e.g. "Gujarat").
 * @property {string} pincode - Postal ZIP code.
 * @property {string} country - Country name.
 * @property {string} full - Unified full-line address string.
 */

/**
 * @typedef {Object} CompanyEmails
 * @property {string} info - Corporate query email.
 * @property {string} sales - Business transactions email.
 * @property {string} support - Helpdesk ticketing email.
 */

/**
 * @typedef {Object} CompanyInfo
 * @property {string} name - Registered legal company name.
 * @property {string} shortName - Abbreviated branding name.
 * @property {string} tagline - Branding tagline slogan.
 * @property {number} foundingYear - Initial incorporation year.
 * @property {string} phone - Registered corporate primary phone number.
 * @property {CompanyEmails} emails - Email addresses.
 * @property {Object.<string, AddressInfo>} addresses - Geographical operations addresses.
 * @property {string} gst - Registered GSTIN code.
 * @property {string} workingHours - Corporate operational timings description.
 * @property {string} mapsUrl - URL of Google Maps coordinates placement.
 */

export const CompanyContract = {
  name: '',
  phone: '',
  emails: { info: '', sales: '', support: '' }
}
export default CompanyContract
