/**
 * @fileoverview Data contract for inquiries and CRM leads.
 */

/**
 * @typedef {Object} InquiryNote
 * @property {string} text - The note text.
 * @property {string} adminName - Name of the admin who wrote the note.
 * @property {string} adminId - Database Identifier of the author.
 * @property {string|Date} createdAt - Time of note creation.
 */

/**
 * @typedef {Object} InquiryAssignee
 * @property {string} id - Database Identifier of the assignee.
 * @property {string} name - Admin name.
 * @property {string} email - Admin email.
 */

/**
 * @typedef {Object} Inquiry
 * @property {string} [id] - Unique Database Identifier.
 * @property {string} name - Prospect name.
 * @property {string} email - Prospect email.
 * @property {string} phone - Prospect contact number.
 * @property {string} [company] - Corporate company name.
 * @property {string} [city] - Location.
 * @property {string} [elevatorType] - Elevator product type of interest.
 * @property {string} [floorCount] - Number of floors in project.
 * @property {string} [message] - Context text.
 * @property {'New'|'Contacted'|'Qualified'|'Closed'|'Rejected'} status - CRM state.
 * @property {string} source - How the lead reached us (e.g. Website, Admin).
 * @property {InquiryAssignee|null} [assignedTo] - Current sales executive.
 * @property {InquiryAssignee|null} [assignedBy] - Assigner context.
 * @property {string|Date|null} [assignedAt] - Timestamp of allocation.
 * @property {InquiryNote[]} notes - Thread of administrative notes.
 * @property {string|Date} [createdAt] - ISO timestamp or Date object.
 */

export const InquiryContract = {
  status: 'New',
  source: 'Website Contact Form',
  notes: [],
  assignedTo: null,
  assignedBy: null,
  assignedAt: null
}

export default InquiryContract
