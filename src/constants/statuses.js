export const STATUSES = Object.freeze({
  INQUIRY: Object.freeze({
    NEW: 'New',
    CONTACTED: 'Contacted',
    QUALIFIED: 'Qualified',
    CLOSED: 'Closed',
    REJECTED: 'Rejected'
  }),
  EMAIL: Object.freeze({
    PENDING: 'pending',
    SENT: 'sent',
    FAILED: 'failed'
  }),
  BLOG: Object.freeze({
    DRAFT: 'Draft',
    PUBLISHED: 'Published'
  })
})

export default STATUSES
