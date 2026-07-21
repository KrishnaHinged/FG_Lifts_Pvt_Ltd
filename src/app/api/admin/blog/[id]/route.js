import { NextResponse } from 'next/server'
import { getAdmin } from '@/lib/auth'
import { getPostById, updatePost, deletePost } from '@/services/blog.service'
import { createAuditLog } from '@/services/audit.service'
import { hasPermission } from '@/permissions/permissions'
import { PERMISSIONS } from '@/permissions/roles'

export async function GET(req, { params }) {
  try {
    const { id } = await params
    const admin = getAdmin(req)
    if (!admin || !hasPermission(admin, PERMISSIONS.VIEW_BLOG)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    const post = await getPostById(id)
    return NextResponse.json({ success: true, post })
  } catch (err) {
    console.error('Fetch blog post detail API error:', err)
    return NextResponse.json({ error: err.error || 'Server error' }, { status: err.status || 500 })
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params
    const admin = getAdmin(req)
    if (!admin || !hasPermission(admin, PERMISSIONS.EDIT_BLOG)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    const body = await req.json()
    const original = await getPostById(id)

    // Check publish permissions if changing publish state
    if (body.isPublished && !original.isPublished) {
      if (!hasPermission(admin, PERMISSIONS.PUBLISH_BLOG)) {
        return NextResponse.json({ error: '403 Forbidden — Cannot publish' }, { status: 403 })
      }
      body.publishedAt = new Date()
    }

    const post = await updatePost(id, body)

    // Log action
    try {
      const isPublishTransition = body.isPublished && !original.isPublished
      await createAuditLog({
        action: isPublishTransition ? 'blog_published' : 'blog_created',
        performedBy: admin,
        targetId: id,
        targetType: 'BlogPost',
        details: { title: post.title, slug: post.slug, updated: true },
        ipAddress: req.headers.get('x-forwarded-for') || 'unknown'
      })
    } catch (logErr) {
      console.error('Failed to log blog update audit trail:', logErr)
    }

    return NextResponse.json({ success: true, post })
  } catch (err) {
    if (err.status === 400) {
      return NextResponse.json({ error: Object.values(err.errors)[0] || err.error }, { status: 400 })
    }
    console.error('Update blog post API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params
    const admin = getAdmin(req)
    if (!admin || !hasPermission(admin, PERMISSIONS.DELETE_BLOG)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    const post = await deletePost(id)

    // Log action
    try {
      await createAuditLog({
        action: 'blog_deleted',
        performedBy: admin,
        targetId: id,
        targetType: 'BlogPost',
        details: { title: post.title, slug: post.slug },
        ipAddress: req.headers.get('x-forwarded-for') || 'unknown'
      })
    } catch (logErr) {
      console.error('Failed to log blog deletion audit trail:', logErr)
    }

    return NextResponse.json({ success: true, message: 'Post deleted successfully' })
  } catch (err) {
    console.error('Delete blog post API error:', err)
    return NextResponse.json({ error: err.error || 'Server error' }, { status: 500 })
  }
}

export async function PATCH(req, { params }) {
  try {
    const { id } = await params
    const admin = getAdmin(req)
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const original = await getPostById(id)

    // Handle single-field publishes or toggle updates
    const updates = { ...original, ...body }
    if (body.isPublished !== undefined && body.isPublished !== original.isPublished) {
      if (!hasPermission(admin, PERMISSIONS.PUBLISH_BLOG)) {
        return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
      }
      updates.isPublished = body.isPublished
      if (body.isPublished) {
        updates.publishedAt = new Date()
      }
    }

    const post = await updatePost(id, updates)

    // Log action
    try {
      await createAuditLog({
        action: body.isPublished ? 'blog_published' : 'blog_created',
        performedBy: admin,
        targetId: id,
        targetType: 'BlogPost',
        details: { title: post.title, slug: post.slug, patch: true },
        ipAddress: req.headers.get('x-forwarded-for') || 'unknown'
      })
    } catch (logErr) {
      console.error('Failed to log blog patch audit trail:', logErr)
    }

    return NextResponse.json({ success: true, post })
  } catch (err) {
    if (err.status === 400) {
      return NextResponse.json({ error: Object.values(err.errors)[0] || err.error }, { status: 400 })
    }
    console.error('Patch blog post API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
