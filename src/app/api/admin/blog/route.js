import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import BlogPost from '@/models/BlogPost'
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
    if (!admin || !hasPermission(admin, PERMISSIONS.VIEW_BLOG)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    await connectDB()
    const posts = await BlogPost.find().sort({ createdAt: -1 }).lean()
    return NextResponse.json({ success: true, posts })
  } catch (err) {
    console.error('Fetch blog posts error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const admin = getAdmin(req)
    if (!admin || !hasPermission(admin, PERMISSIONS.CREATE_BLOG)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    const body = await req.json()
    const { slug, title } = body

    if (!slug || !title) {
      return NextResponse.json({ error: 'Slug and title are required' }, { status: 400 })
    }

    await connectDB()
    const existing = await BlogPost.findOne({ slug: slug.toLowerCase() })
    if (existing) {
      return NextResponse.json({ error: 'Post slug already exists' }, { status: 409 })
    }

    // Save with Mongoose constructor so the readTime pre-save hook runs
    const post = new BlogPost(body)
    await post.save()

    // Log action
    await createLog({
      action: 'blog_created',
      performedBy: { adminId: admin.id, name: admin.name, email: admin.email, role: admin.role },
      targetId: post._id.toString(),
      targetType: 'BlogPost',
      details: { title: post.title, slug: post.slug }
    })

    return NextResponse.json({ success: true, post }, { status: 201 })
  } catch (err) {
    console.error('Create post error:', err)
    return NextResponse.json({ error: 'Server error: ' + err.message }, { status: 500 })
  }
}
