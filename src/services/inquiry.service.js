import * as inquiryRepo from '@/repositories/inquiry.repository'
import { validateContact } from '@/validators/contact.validator'
import { mapToInquiryDTO, mapToInquiryListDTO } from '@/mappers/inquiry.mapper'
import { sendInquiryReceivedEmail, sendLeadAssignedEmail } from './email.service'
import { findAdminById } from '@/repositories/admin.repository'
import { sendMail } from '@/adapters/email.adapter'

export async function createLead(data) {
  const { isValid, errors } = validateContact(data)
  if (!isValid) {
    throw { status: 400, errors }
  }

  const inquiry = await inquiryRepo.createInquiry({
    name: data.name,
    email: data.email,
    phone: data.phone,
    company: data.company || '',
    city: data.city || '',
    elevatorType: data.elevatorType || '',
    floorCount: data.floorCount || '',
    message: data.message || '',
    source: data.source || 'Website'
  })

  // Queue background confirmation email to the customer
  try {
    await sendInquiryReceivedEmail(inquiry)
  } catch (err) {
    console.error('Failed to queue thank-you email:', err)
  }

  // Notify Admin Directly
  try {
    const adminEmail = process.env.SMTP_USER || 'info@fglifts.com'
    const htmlBody = `
      <h2>New Website Inquiry</h2>
      <p>A new lead just submitted the contact form.</p>
      <hr />
      <p><strong>Name:</strong> ${inquiry.name}</p>
      <p><strong>Email:</strong> ${inquiry.email}</p>
      <p><strong>Phone:</strong> ${inquiry.phone}</p>
      <p><strong>Company:</strong> ${inquiry.company || 'N/A'}</p>
      <p><strong>City:</strong> ${inquiry.city || 'N/A'}</p>
      <p><strong>Elevator Type:</strong> ${inquiry.elevatorType || 'N/A'}</p>
      <p><strong>Floors:</strong> ${inquiry.floorCount || 'N/A'}</p>
      <p><strong>Message:</strong> ${inquiry.message || 'N/A'}</p>
      <hr />
      <p>Log in to the <a href="${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/admin">Admin Dashboard</a> to view or assign this lead.</p>
    `
    await sendMail({
      to: adminEmail,
      subject: `New Lead: ${inquiry.name} - ${inquiry.elevatorType || 'Website Inquiry'}`,
      html: htmlBody
    })
  } catch (err) {
    console.error('Failed to notify admin directly:', err)
  }

  return mapToInquiryDTO(inquiry)
}

export async function getLeads(query = {}, userContext = null) {
  // If the user role is SALES_EXECUTIVE, restrict to assigned inquiries
  const dbQuery = {}
  if (userContext && userContext.role === 'SALES_EXECUTIVE') {
    dbQuery.assignedTo = userContext.id
  } else if (query.assignedTo) {
    dbQuery.assignedTo = query.assignedTo
  }

  if (query.status) {
    dbQuery.status = query.status
  }

  const list = await inquiryRepo.getAllInquiries(dbQuery)
  return mapToInquiryListDTO(list)
}

export async function getLeadById(id, userContext = null) {
  const lead = await inquiryRepo.getInquiryById(id)
  if (!lead) {
    throw { status: 404, error: 'Inquiry not found.' }
  }

  if (userContext && userContext.role === 'SALES_EXECUTIVE' && lead.assignedTo?.toString() !== userContext.id) {
    throw { status: 403, error: 'Forbidden. You do not have access to this inquiry.' }
  }

  return mapToInquiryDTO(lead)
}

export async function updateLeadStatus(id, status, userContext) {
  const lead = await getLeadById(id, userContext)
  const updated = await inquiryRepo.updateInquiry(id, { status })
  return mapToInquiryDTO(updated)
}

export async function assignLead(id, assignedTo, userContext) {
  const lead = await getLeadById(id, userContext)
  
  let executive = null
  if (assignedTo) {
    executive = await findAdminById(assignedTo)
    if (!executive) {
      throw { status: 400, error: 'Assigned executive not found.' }
    }
  }

  const updated = await inquiryRepo.updateInquiry(id, {
    assignedTo: assignedTo || null,
    assignedBy: userContext.id,
    assignedAt: assignedTo ? new Date() : null
  })

  // Email notifications for new assignment
  if (assignedTo && executive) {
    try {
      const manager = await findAdminById(userContext.id)
      await sendLeadAssignedEmail({ executive, inquiry: updated, manager })
    } catch (err) {
      console.error('Failed to dispatch assignment email:', err)
    }
  }

  return mapToInquiryDTO(updated)
}

export async function addLeadNote(id, text, userContext) {
  const lead = await getLeadById(id, userContext)
  if (!text || text.trim() === '') {
    throw { status: 400, error: 'Note text cannot be empty.' }
  }

  // Fetch the full inquiry to push the note inside notes array
  const fullInquiry = await inquiryRepo.getInquiryById(id)
  fullInquiry.notes = fullInquiry.notes || []
  fullInquiry.notes.push({
    text: text.trim(),
    adminName: userContext.name || userContext.email,
    adminId: userContext.id,
    createdAt: new Date()
  })

  const updated = await inquiryRepo.updateInquiry(id, { notes: fullInquiry.notes })
  return mapToInquiryDTO(updated)
}

export async function deleteLead(id, userContext) {
  // Only SUPER_ADMIN has permission (enforced in route controller, but checked here as well)
  if (userContext.role !== 'SUPER_ADMIN') {
    throw { status: 403, error: 'Forbidden. Only Super Admins can delete inquiries.' }
  }
  const deleted = await inquiryRepo.deleteInquiry(id)
  if (!deleted) {
    throw { status: 404, error: 'Inquiry not found.' }
  }
  return mapToInquiryDTO(deleted)
}

export async function countLeads(query = {}) {
  return inquiryRepo.countInquiries(query)
}

export async function getRecentLeads(query = {}, limit = 5) {
  const list = await inquiryRepo.getRecentInquiries(query, limit)
  return mapToInquiryListDTO(list)
}

export async function exportLeadsToCSV() {
  const list = await inquiryRepo.getAllInquiries()
  const rows = [
    ['Reference ID', 'Date', 'Name', 'Email', 'Phone', 'Company', 'City', 'Elevator Type', 'Floors', 'Status', 'Message']
  ]
  
  list.forEach((item) => {
    rows.push([
      item._id.toString().slice(-6).toUpperCase(),
      item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '',
      item.name || '',
      item.email || '',
      item.phone || '',
      item.company || '',
      item.city || '',
      item.elevatorType || '',
      item.floorCount || '',
      item.status || '',
      (item.message || '').replace(/\r?\n|\r/g, ' ')
    ])
  })

  return rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n')
}
