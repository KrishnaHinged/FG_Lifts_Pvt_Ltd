import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Inquiry from '@/models/Inquiry'
import { verifyToken, COOKIE_NAME } from '@/lib/auth'
import { hasPermission } from '@/permissions/permissions'
import { PERMISSIONS } from '@/permissions/roles'
import { createLog } from '@/repositories/auditLog.repository'

export async function GET(req) {
  try {
    const token = req.cookies.get(COOKIE_NAME)?.value
    const admin = token ? verifyToken(token) : null

    if (!admin || !hasPermission(admin, PERMISSIONS.EXPORT_CRM)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    await connectDB()
    const inquiries = await Inquiry.find().lean()

    const header = ['ID','Name','Email','Phone','Company','City','Elevator Type','Floors','Status','Created At']
    const rows = inquiries.map(i => [
      i._id.toString().slice(-6).toUpperCase(),
      i.name, i.email, i.phone,
      i.company || '', i.city || '',
      i.elevatorType || '', i.floorCount || '',
      i.status,
      new Date(i.createdAt).toLocaleDateString('en-IN')
    ])

    const csv = [header, ...rows]
      .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n')

    // Log the export action
    await createLog({
      action: 'subscriber_exported', // Matches the closest action code
      performedBy: { adminId: admin.id, name: admin.name, email: admin.email, role: admin.role },
      details: { exportType: 'CRM Inquiries' }
    })

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="fg-lift-inquiries-${Date.now()}.csv"`,
      }
    })
  } catch (err) {
    console.error('Inquiries export error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
