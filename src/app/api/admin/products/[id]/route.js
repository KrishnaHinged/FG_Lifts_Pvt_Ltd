import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Product from '@/models/Product'
import { verifyToken, COOKIE_NAME } from '@/lib/auth'
import { hasPermission } from '@/permissions/permissions'
import { PERMISSIONS } from '@/permissions/roles'
import { createLog } from '@/repositories/auditLog.repository'

function getAdmin(req) {
  const token = req.cookies.get(COOKIE_NAME)?.value
  return token ? verifyToken(token) : null
}

export async function GET(req, { params }) {
  try {
    const { id } = await params
    const admin = getAdmin(req)
    if (!admin || !hasPermission(admin, PERMISSIONS.VIEW_PRODUCTS)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    await connectDB()
    const product = await Product.findById(id).lean()
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    return NextResponse.json({ success: true, product })
  } catch (err) {
    console.error('Fetch product detail error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
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
    await connectDB()
    const product = await Product.findByIdAndUpdate(id, body, { new: true }).lean()
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 })

    // Log action
    await createLog({
      action: 'product_updated',
      performedBy: { adminId: admin.id, name: admin.name, email: admin.email, role: admin.role },
      targetId: id,
      targetType: 'Product',
      details: { name: product.name, slug: product.slug }
    })

    return NextResponse.json({ success: true, product })
  } catch (err) {
    console.error('Update product error:', err)
    return NextResponse.json({ error: 'Server error: ' + err.message }, { status: 500 })
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params
    const admin = getAdmin(req)
    if (!admin || !hasPermission(admin, PERMISSIONS.DELETE_PRODUCT)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    await connectDB()
    const product = await Product.findByIdAndDelete(id)
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 })

    // Log action
    await createLog({
      action: 'product_deleted',
      performedBy: { adminId: admin.id, name: admin.name, email: admin.email, role: admin.role },
      targetId: id,
      targetType: 'Product',
      details: { name: product.name, slug: product.slug }
    })

    return NextResponse.json({ success: true, message: 'Product deleted successfully' })
  } catch (err) {
    console.error('Delete product error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
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
    await connectDB()
    const product = await Product.findByIdAndUpdate(id, body, { new: true }).lean()
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 })

    // Log action
    await createLog({
      action: 'product_updated',
      performedBy: { adminId: admin.id, name: admin.name, email: admin.email, role: admin.role },
      targetId: id,
      targetType: 'Product',
      details: { name: product.name, slug: product.slug, patch: true }
    })

    return NextResponse.json({ success: true, product })
  } catch (err) {
    console.error('Patch product error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
