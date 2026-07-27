import { NextResponse } from 'next/server'
import { getAdmin } from '@/lib/auth'
import { getAllTestimonialsAdmin, createTestimonial } from '@/services/testimonial.service'
import { createAuditLog } from '@/services/audit.service'
import { hasPermission } from '@/permissions/permissions'
import { PERMISSIONS } from '@/permissions/roles'

export async function GET(req) {
  try {
    const admin = getAdmin(req)
    if (!admin || !hasPermission(admin, PERMISSIONS.VIEW_TESTIMONIALS)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    const testimonials = await getAllTestimonialsAdmin()
    return NextResponse.json({ success: true, testimonials })
  } catch (err) {
    console.error('Fetch testimonials admin API error:', err)
    return NextResponse.json({ error: err.error || 'Server error' }, { status: err.status || 500 })
  }
}

export async function POST(req) {
  try {
    const admin = getAdmin(req)
    if (!admin || !hasPermission(admin, PERMISSIONS.CREATE_TESTIMONIAL)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    const body = await req.json()
    const testimonial = await createTestimonial(body)

    // Log action
    try {
      await createAuditLog({
        action: 'testimonial_created',
        performedBy: admin,
        targetId: testimonial.id,
        targetType: 'Testimonial',
        details: { name: testimonial.name },
        ipAddress: req.headers.get('x-forwarded-for') || 'unknown'
      })
    } catch (logErr) {
      console.error('Failed to log testimonial creation audit trail:', logErr)
    }

    return NextResponse.json({ success: true, testimonial }, { status: 201 })
  } catch (err) {
    if (err.status === 400) {
      const firstError = err.errors ? Object.values(err.errors)[0] : null
      const errorMsg = firstError || err.error || err.message || 'Validation error'
      return NextResponse.json({ error: errorMsg }, { status: 400 })
    }
    console.error('Create testimonial API error:', err)
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}
