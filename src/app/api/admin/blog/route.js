import { NextResponse } from 'next/server'
import { getAdmin } from '@/lib/auth'
import { getAllPostsAdmin, createPost } from '@/services/blog.service'
import { createAuditLog } from '@/services/audit.service'
import { hasPermission } from '@/permissions/permissions'
import { PERMISSIONS } from '@/permissions/roles'

export async function GET(req) {
  try {
    const admin = getAdmin(req)
    if (!admin || !hasPermission(admin, PERMISSIONS.VIEW_BLOG)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    const posts = await getAllPostsAdmin()
    return NextResponse.json({ success: true, posts })
  } catch (err) {
    console.error('Fetch blog posts admin API error:', err)
    return NextResponse.json({ error: err.error || 'Server error' }, { status: err.status || 500 })
  }
}

export async function POST(req) {
  try {
    const admin = getAdmin(req)
    if (!admin || !hasPermission(admin, PERMISSIONS.CREATE_BLOG)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    const body = await req.json()
    const post = await createPost(body)

    // Log action
    try {
      await createAuditLog({
        action: 'blog_created',
        performedBy: admin,
        targetId: post.id,
        targetType: 'BlogPost',
        details: { title: post.title, slug: post.slug },
        ipAddress: req.headers.get('x-forwarded-for') || 'unknown'
      })
    } catch (logErr) {
      console.error('Failed to log blog creation audit trail:', logErr)
    }

    return NextResponse.json({ success: true, post }, { status: 201 })
  } catch (err) {
    if (err.status === 400) {
      return NextResponse.json({ error: Object.values(err.errors)[0] || err.error }, { status: 400 })
    }
    console.error('Create blog post API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
