import { NextResponse } from 'next/server'
import authConfig from '@/config/auth'

export async function POST() {
  const response = NextResponse.json({ success: true })
  response.cookies.set(authConfig.cookieName, '', { maxAge: 0, path: '/' })
  return response
}
