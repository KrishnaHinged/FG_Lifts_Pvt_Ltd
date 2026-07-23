import { NextResponse } from 'next/server'
import { getAdmin } from '@/lib/auth'
import { getProductById, updateProduct, deleteProduct } from '@/services/product.service'
import { createAuditLog } from '@/services/audit.service'
import { hasPermission } from '@/permissions/permissions'
import { PERMISSIONS } from '@/permissions/roles'

export async function GET(req, { params }) {
  try {
    const { id } = await params
    const admin = getAdmin(req)
    if (!admin || !hasPermission(admin, PERMISSIONS.VIEW_PRODUCTS)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    const product = await getProductById(id)
    return NextResponse.json({ success: true, product })
  } catch (err) {
    console.error('Fetch product detail API error:', err)
    return NextResponse.json({ error: err.error || 'Server error' }, { status: err.status || 500 })
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params
    const admin = getAdmin(req)
    if (!admin || !hasPermission(admin, PERMISSIONS.EDIT_PRODUCT)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    const body = await req.json()
    const product = await updateProduct(id, body)

    // Log action
    try {
      await createAuditLog({
        action: 'product_updated',
        performedBy: admin,
        targetId: id,
        targetType: 'Product',
        details: { name: product.name, slug: product.slug },
        ipAddress: req.headers.get('x-forwarded-for') || 'unknown'
      })
    } catch (logErr) {
      console.error('Failed to log product update audit trail:', logErr)
    }

    return NextResponse.json({ success: true, product })
  } catch (err) {
    if (err.status === 400) {
      const firstError = err.errors ? Object.values(err.errors)[0] : null
      const errorMsg = firstError || err.error || err.message || 'Validation error'
      return NextResponse.json({ error: errorMsg }, { status: 400 })
    }
    console.error('Update product API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params
    const admin = getAdmin(req)
    if (!admin || !hasPermission(admin, PERMISSIONS.DELETE_PRODUCT)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    const product = await deleteProduct(id)

    // Log action
    try {
      await createAuditLog({
        action: 'product_deleted',
        performedBy: admin,
        targetId: id,
        targetType: 'Product',
        details: { name: product.name, slug: product.slug },
        ipAddress: req.headers.get('x-forwarded-for') || 'unknown'
      })
    } catch (logErr) {
      console.error('Failed to log product deletion audit trail:', logErr)
    }

    return NextResponse.json({ success: true, message: 'Product deleted successfully' })
  } catch (err) {
    console.error('Delete product API error:', err)
    return NextResponse.json({ error: err.error || 'Server error' }, { status: err.status || 500 })
  }
}

export async function PATCH(req, { params }) {
  try {
    const { id } = await params
    const admin = getAdmin(req)
    if (!admin || !hasPermission(admin, PERMISSIONS.EDIT_PRODUCT)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    const body = await req.json()
    
    // Retrieve product to apply patch updates
    const current = await getProductById(id)
    const merged = { ...current, ...body }
    const product = await updateProduct(id, merged)

    // Log action
    try {
      await createAuditLog({
        action: 'product_updated',
        performedBy: admin,
        targetId: id,
        targetType: 'Product',
        details: { name: product.name, slug: product.slug, patch: true },
        ipAddress: req.headers.get('x-forwarded-for') || 'unknown'
      })
    } catch (logErr) {
      console.error('Failed to log product patch audit trail:', logErr)
    }

    return NextResponse.json({ success: true, product })
  } catch (err) {
    if (err.status === 400) {
      const firstError = err.errors ? Object.values(err.errors)[0] : null
      const errorMsg = firstError || err.error || err.message || 'Validation error'
      return NextResponse.json({ error: errorMsg }, { status: 400 })
    }
    console.error('Patch product API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
