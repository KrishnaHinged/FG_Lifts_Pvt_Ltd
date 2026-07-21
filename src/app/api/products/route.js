import { NextResponse } from 'next/server'
import { getActiveProducts } from '@/services/product.service'

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const tabGroup = searchParams.get('tabGroup') || null
    const category = searchParams.get('category') || null
    const products = await getActiveProducts({ tabGroup, category })
    return NextResponse.json({ success: true, products })
  } catch (err) {
    console.error('Products API endpoint error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
