import * as emailTemplateRepo from '@/repositories/emailTemplate.repository'
import * as emailQueueRepo from '@/repositories/emailQueue.repository'

function compileTemplate(body, variables = {}) {
  let compiled = body
  Object.entries(variables).forEach(([key, value]) => {
    compiled = compiled.replaceAll(`{{${key}}}`, value || '')
  })
  return compiled
}

export async function queueEmail({ templateName, to, variables = {}, relatedId = '' }) {
  const template = await emailTemplateRepo.getTemplateByName(templateName)
  if (!template) {
    console.warn(`[EmailService] Template not found: ${templateName}`)
    return null
  }
  const subject = compileTemplate(template.subject, variables)
  const body = compileTemplate(template.body, variables)
  
  return emailQueueRepo.createQueueItem({
    to,
    subject,
    body,
    templateName,
    relatedId,
    status: 'pending',
    attempts: 0
  })
}

// Convenience wrappers
export async function sendInquiryReceivedEmail(inquiry) {
  return queueEmail({
    templateName: 'inquiry_received',
    to: inquiry.email,
    variables: {
      name: inquiry.name,
      product: inquiry.elevatorType || 'elevator system',
      company: inquiry.company || '',
      referenceId: inquiry._id?.toString().slice(-6).toUpperCase() || ''
    },
    relatedId: inquiry._id?.toString() || ''
  })
}

export async function sendLeadAssignedEmail({ executive, inquiry, manager }) {
  return queueEmail({
    templateName: 'lead_assigned',
    to: executive.email,
    variables: {
      executiveName: executive.name,
      clientName: inquiry.name,
      clientPhone: inquiry.phone,
      clientCompany: inquiry.company || '',
      product: inquiry.elevatorType || '',
      assignedBy: manager.name,
      adminUrl: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/admin/inquiries`
    },
    relatedId: inquiry._id?.toString() || ''
  })
}

export async function getAllEmailTemplates() {
  return emailTemplateRepo.getAllTemplates()
}

export async function updateEmailTemplate(id, data) {
  const { validateEmailTemplate } = await import('@/validators/email.validator')
  const { isValid, errors } = validateEmailTemplate(data)
  if (!isValid) {
    throw { status: 400, errors }
  }

  const updated = await emailTemplateRepo.updateTemplate(id, data)
  if (!updated) {
    throw { status: 404, error: 'Email template not found.' }
  }
  return updated
}

