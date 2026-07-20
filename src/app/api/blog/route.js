import { NextResponse } from 'next/server'
import { getAllPublishedPosts, getAllCategories } from '@/repositories/blog.repository'

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category') || null
    const tag      = searchParams.get('tag') || null

    const [posts, categories] = await Promise.all([
      getAllPublishedPosts({ category, tag }),
      getAllCategories()
    ])

    return NextResponse.json({ success: true, posts, categories })
  } catch (err) {
    console.error('Blog API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
