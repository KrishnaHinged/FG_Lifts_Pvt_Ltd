import emailConfig from '@/config/email'

export const EMAILS = Object.freeze({
  FROM_ADDRESS: emailConfig.fromName ? `"${emailConfig.fromName}" <${emailConfig.fromAddress}>` : '',
  TEMPLATES: Object.freeze({
    INQUIRY_RECEIVED: 'inquiry_received',
    LEAD_ASSIGNED: 'lead_assigned',
    NEWSLETTER_WELCOME: 'newsletter_welcome'
  })
})

export default EMAILS
