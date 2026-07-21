export function mapToInquiryDTO(inquiry) {
  if (!inquiry) return null
  return {
    id: inquiry._id?.toString(),
    name: inquiry.name,
    email: inquiry.email,
    phone: inquiry.phone,
    company: inquiry.company || '',
    city: inquiry.city || '',
    elevatorType: inquiry.elevatorType || '',
    floorCount: inquiry.floorCount || '',
    message: inquiry.message || '',
    status: inquiry.status,
    notes: (inquiry.notes || []).map(note => ({
      text: note.text,
      adminName: note.adminName,
      adminId: note.adminId?.toString(),
      createdAt: note.createdAt
    })),
    assignedTo: inquiry.assignedTo ? {
      id: inquiry.assignedTo._id?.toString() || inquiry.assignedTo.toString(),
      name: inquiry.assignedTo.name || '',
      email: inquiry.assignedTo.email || ''
    } : null,
    assignedBy: inquiry.assignedBy ? {
      id: inquiry.assignedBy._id?.toString() || inquiry.assignedBy.toString(),
      name: inquiry.assignedBy.name || '',
      email: inquiry.assignedBy.email || ''
    } : null,
    assignedAt: inquiry.assignedAt || null,
    source: inquiry.source || 'Website',
    createdAt: inquiry.createdAt
  }
}

export function mapToInquiryListDTO(inquiries) {
  if (!Array.isArray(inquiries)) return []
  return inquiries.map(mapToInquiryDTO)
}
