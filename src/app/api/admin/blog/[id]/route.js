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

export async function GET(req, { params }) {
  try {
    const { id } = await params
    const admin = getAdmin(req)
    if (!admin || !hasPermission(admin, PERMISSIONS.VIEW_BLOG)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    await connectDB()
    const post = await BlogPost.findById(id).lean()
    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    return NextResponse.json({ success: true, post })
  } catch (err) {
    console.error('Fetch post detail error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
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
    await connectDB()
    
    // Find original to check publish transition
    const original = await BlogPost.findById(id)
    if (!original) return NextResponse.json({ error: 'Post not found' }, { status: 404 })

    // Check publish permissions if changing publish state
    if (body.isPublished && !original.isPublished) {
      if (!hasPermission(admin, PERMISSIONS.PUBLISH_BLOG)) {
        return NextResponse.json({ error: '403 Forbidden — Cannot publish' }, { status: 403 })
      }
      body.publishedAt = new Date()
    }

    // Apply updates manually to trigger schema pre-save hook
    Object.keys(body).forEach((key) => {
      original[key] = body[key]
    })
    await original.save()

    // Log action
    if (body.isPublished && !original.isPublished) {
      await createLog({
        action: 'blog_published',
        performedBy: { adminId: admin.id, name: admin.name, email: admin.email, role: admin.role },
        targetId: id,
        targetType: 'BlogPost',
        details: { title: original.title, slug: original.slug }
      })
    } else {
      await createLog({
        action: 'blog_created', // closest update/log action
        performedBy: { adminId: admin.id, name: admin.name, email: admin.email, role: admin.role },
        targetId: id,
        targetType: 'BlogPost',
        details: { title: original.title, slug: original.slug, updated: true }
      })
    }

    return NextResponse.json({ success: true, post: original })
  } catch (err) {
    console.error('Update post error:', err)
    return NextResponse.json({ error: 'Server error: ' + err.message }, { status: 500 })
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params
    const admin = getAdmin(req)
    if (!admin || !hasPermission(admin, PERMISSIONS.DELETE_BLOG)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    await connectDB()
    const post = await BlogPost.findByIdAndDelete(id)
    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 })

    // Log action
    await createLog({
      action: 'blog_deleted',
      performedBy: { adminId: admin.id, name: admin.name, email: admin.email, role: admin.role },
      targetId: id,
      targetType: 'BlogPost',
      details: { title: post.title, slug: post.slug }
    })

    return NextResponse.json({ success: true, message: 'Post deleted successfully' })
  } catch (err) {
    console.error('Delete post error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
export async function PATCH(req, { params }) {
  try {
    const { id } = await params
    const admin = getAdmin(req)
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    await connectDB()
    const post = await BlogPost.findById(id)
    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 })

    // Handle single-field publishes or toggle updates
    if (body.isPublished !== undefined && body.isPublished !== post.isPublished) {
      if (!hasPermission(admin, PERMISSIONS.PUBLISH_BLOG)) {
        return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
      }
      post.isPublished = body.isPublished
      if (body.isPublished) {
        post.publishedAt = new Date()
      }
    }

    // Apply any other fields
    Object.keys(body).forEach((k) => {
      if (k !== 'isPublished') post[k] = body[k]
    })

    await post.save()

    // Log action
    await createLog({
      action: body.isPublished ? 'blog_published' : 'blog_created',
      performedBy: { adminId: admin.id, name: admin.name, email: admin.email, role: admin.role },
      targetId: id,
      targetType: 'BlogPost',
      details: { title: post.title, slug: post.slug, patch: true }
    })

    return NextResponse.json({ success: true, post })
  } catch (err) {
    console.error('Patch post error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
