import { NextResponse } from 'next/server'
import { getAdmin } from '@/lib/auth'
import { getTestimonialById, updateTestimonial, deleteTestimonial } from '@/services/testimonial.service'
import { createAuditLog } from '@/services/audit.service'
import { hasPermission } from '@/permissions/permissions'
import { PERMISSIONS } from '@/permissions/roles'

export async function GET(req, { params }) {
  try {
    const { id } = await params
    const admin = getAdmin(req)
    if (!admin || !hasPermission(admin, PERMISSIONS.VIEW_TESTIMONIALS)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    const testimonial = await getTestimonialById(id)
    return NextResponse.json({ success: true, testimonial })
  } catch (err) {
    console.error('Fetch testimonial detail API error:', err)
    return NextResponse.json({ error: err.error || 'Server error' }, { status: err.status || 500 })
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params
    const admin = getAdmin(req)
    if (!admin || !hasPermission(admin, PERMISSIONS.EDIT_TESTIMONIAL)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    const body = await req.json()
    const testimonial = await updateTestimonial(id, body)

    // Log action
    try {
      await createAuditLog({
        action: 'testimonial_updated',
        performedBy: admin,
        targetId: id,
        targetType: 'Testimonial',
        details: { name: testimonial.name },
        ipAddress: req.headers.get('x-forwarded-for') || 'unknown'
      })
    } catch (logErr) {
      console.error('Failed to log testimonial update audit trail:', logErr)
    }

    return NextResponse.json({ success: true, testimonial })
  } catch (err) {
    if (err.status === 400) {
      const firstError = err.errors ? Object.values(err.errors)[0] : null
      const errorMsg = firstError || err.error || err.message || 'Validation error'
      return NextResponse.json({ error: errorMsg }, { status: 400 })
    }
    console.error('Update testimonial API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params
    const admin = getAdmin(req)
    if (!admin || !hasPermission(admin, PERMISSIONS.DELETE_TESTIMONIAL)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    const testimonial = await deleteTestimonial(id)

    // Log action
    try {
      await createAuditLog({
        action: 'testimonial_deleted',
        performedBy: admin,
        targetId: id,
        targetType: 'Testimonial',
        details: { name: testimonial.name },
        ipAddress: req.headers.get('x-forwarded-for') || 'unknown'
      })
    } catch (logErr) {
      console.error('Failed to log testimonial deletion audit trail:', logErr)
    }

    return NextResponse.json({ success: true, message: 'Testimonial deleted successfully' })
  } catch (err) {
    console.error('Delete testimonial API error:', err)
    return NextResponse.json({ error: err.error || 'Server error' }, { status: err.status || 500 })
  }
}

export async function PATCH(req, { params }) {
  try {
    const { id } = await params
    const admin = getAdmin(req)
    if (!admin || !hasPermission(admin, PERMISSIONS.EDIT_TESTIMONIAL)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    const body = await req.json()
    
    // Retrieve testimonial to apply patch updates
    const current = await getTestimonialById(id)
    const merged = { ...current, ...body }
    const testimonial = await updateTestimonial(id, merged)

    // Log action
    try {
      await createAuditLog({
        action: 'testimonial_updated',
        performedBy: admin,
        targetId: id,
        targetType: 'Testimonial',
        details: { name: testimonial.name, patch: true },
        ipAddress: req.headers.get('x-forwarded-for') || 'unknown'
      })
    } catch (logErr) {
      console.error('Failed to log testimonial patch audit trail:', logErr)
    }

    return NextResponse.json({ success: true, testimonial })
  } catch (err) {
    if (err.status === 400) {
      const firstError = err.errors ? Object.values(err.errors)[0] : null
      const errorMsg = firstError || err.error || err.message || 'Validation error'
      return NextResponse.json({ error: errorMsg }, { status: 400 })
    }
    console.error('Patch testimonial API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
