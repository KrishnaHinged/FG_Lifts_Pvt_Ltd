import { NextResponse } from 'next/server'
import { getAllProducts } from '@/repositories/product.repository'

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const tabGroup = searchParams.get('tabGroup') || null
    const category = searchParams.get('category') || null
    const products = await getAllProducts({ tabGroup, category })
    return NextResponse.json({ success: true, products })
  } catch (err) {
    console.error('Products API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
