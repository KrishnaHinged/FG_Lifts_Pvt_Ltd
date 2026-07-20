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

export async function GET(req) {
  try {
    const admin = getAdmin(req)
    if (!admin || !hasPermission(admin, PERMISSIONS.VIEW_PRODUCTS)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    await connectDB()
    const products = await Product.find().sort({ sortOrder: 1, createdAt: -1 }).lean()
    return NextResponse.json({ success: true, products })
  } catch (err) {
    console.error('Fetch products error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const admin = getAdmin(req)
    if (!admin || !hasPermission(admin, PERMISSIONS.CREATE_PRODUCT)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    const body = await req.json()
    const { slug, name } = body

    if (!slug || !name) {
      return NextResponse.json({ error: 'Slug and name are required' }, { status: 400 })
    }

    await connectDB()
    const existing = await Product.findOne({ slug: slug.toLowerCase() })
    if (existing) {
      return NextResponse.json({ error: 'Product slug already exists' }, { status: 409 })
    }

    const product = await Product.create(body)

    // Log action
    await createLog({
      action: 'product_created',
      performedBy: { adminId: admin.id, name: admin.name, email: admin.email, role: admin.role },
      targetId: product._id.toString(),
      targetType: 'Product',
      details: { name: product.name, slug: product.slug }
    })

    return NextResponse.json({ success: true, product }, { status: 201 })
  } catch (err) {
    console.error('Create product error:', err)
    return NextResponse.json({ error: 'Server error: ' + err.message }, { status: 500 })
  }
}
