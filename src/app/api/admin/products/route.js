import { NextResponse } from 'next/server'
import { getAdmin } from '@/lib/auth'
import { getAllProductsAdmin, createProduct } from '@/services/product.service'
import { createAuditLog } from '@/services/audit.service'
import { hasPermission } from '@/permissions/permissions'
import { PERMISSIONS } from '@/permissions/roles'

export async function GET(req) {
  try {
    const admin = getAdmin(req)
    if (!admin || !hasPermission(admin, PERMISSIONS.VIEW_PRODUCTS)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    const products = await getAllProductsAdmin()
    return NextResponse.json({ success: true, products })
  } catch (err) {
    console.error('Fetch products admin API error:', err)
    return NextResponse.json({ error: err.error || 'Server error' }, { status: err.status || 500 })
  }
}

export async function POST(req) {
  try {
    const admin = getAdmin(req)
    if (!admin || !hasPermission(admin, PERMISSIONS.CREATE_PRODUCT)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    const body = await req.json()
    const product = await createProduct(body)

    // Log action
    try {
      await createAuditLog({
        action: 'product_created',
        performedBy: admin,
        targetId: product.id,
        targetType: 'Product',
        details: { name: product.name, slug: product.slug },
        ipAddress: req.headers.get('x-forwarded-for') || 'unknown'
      })
    } catch (logErr) {
      console.error('Failed to log product creation audit trail:', logErr)
    }

    return NextResponse.json({ success: true, product }, { status: 201 })
  } catch (err) {
    if (err.status === 400) {
      const firstError = err.errors ? Object.values(err.errors)[0] : null
      const errorMsg = firstError || err.error || err.message || 'Validation error'
      return NextResponse.json({ error: errorMsg }, { status: 400 })
    }
    console.error('Create product API error:', err)
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}
