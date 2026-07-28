import { NextResponse } from 'next/server'
import { getAdmin } from '@/lib/auth'
import { findAdminById } from '@/repositories/admin.repository'
import { mapToAdminDTO } from '@/mappers/admin.mapper'

export const dynamic = 'force-dynamic'

export async function GET(req) {
  try {
    const adminToken = getAdmin(req)
    if (!adminToken || !adminToken.id) {
      return NextResponse.json({ success: false, admin: null })
    }

    const admin = await findAdminById(adminToken.id)
    if (!admin || !admin.isActive) {
      return NextResponse.json({ success: false, admin: null })
    }

    return NextResponse.json({
      success: true,
      admin: mapToAdminDTO(admin)
    })
  } catch (err) {
    console.error('Session endpoint error:', err)
    return NextResponse.json({ success: false, admin: null })
  }
}
