import { NextResponse } from 'next/server'
import { getPublishedPosts, getCategories } from '@/services/blog.service'

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category') || null
    const tag      = searchParams.get('tag') || null

    const [posts, categories] = await Promise.all([
      getPublishedPosts({ category, tag }),
      getCategories()
    ])

    return NextResponse.json({ success: true, posts, categories })
  } catch (err) {
    console.error('Blog API endpoint error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
