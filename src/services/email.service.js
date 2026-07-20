import { connectDB } from '@/lib/mongodb'
import EmailQueue from '@/models/EmailQueue'
import { getTemplateByName } from '@/repositories/emailTemplate.repository'

function compilTemplate(body, variables = {}) {
  let compiled = body
  Object.entries(variables).forEach(([key, value]) => {
    compiled = compiled.replaceAll(`{{${key}}}`, value || '')
  })
  return compiled
}

export async function queueEmail({ templateName, to, variables = {}, relatedId = '' }) {
  await connectDB()
  const template = await getTemplateByName(templateName)
  if (!template) {
    console.warn(`[EmailService] Template not found: ${templateName}`)
    return null
  }
  const subject = compilTemplate(template.subject, variables)
  const body    = compilTemplate(template.body, variables)
  return EmailQueue.create({ to, subject, body, templateName, relatedId })
}

// Convenience wrappers
export async function sendInquiryReceivedEmail(inquiry) {
  return queueEmail({
    templateName: 'inquiry_received',
    to: inquiry.email,
    variables: {
      name:         inquiry.name,
      product:      inquiry.elevatorType || 'elevator system',
      company:      inquiry.company || '',
      referenceId:  inquiry._id.toString().slice(-6).toUpperCase(),
    },
    relatedId: inquiry._id.toString()
  })
}

export async function sendLeadAssignedEmail({ executive, inquiry, manager }) {
  return queueEmail({
    templateName: 'lead_assigned',
    to: executive.email,
    variables: {
      executiveName: executive.name,
      clientName:    inquiry.name,
      clientPhone:   inquiry.phone,
      clientCompany: inquiry.company || '',
      product:       inquiry.elevatorType || '',
      assignedBy:    manager.name,
      adminUrl:      `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/admin/inquiries`,
    },
    relatedId: inquiry._id.toString()
  })
}
