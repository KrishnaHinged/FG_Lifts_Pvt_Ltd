import { NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'
import authConfig from '@/config/auth'

const PUBLIC_ADMIN_PATHS = [authConfig.redirects.login]

export async function middleware(request) {
  const { pathname } = request.nextUrl

  if (!pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', pathname)

  if (PUBLIC_ADMIN_PATHS.some(p => pathname.startsWith(p))) {
    return NextResponse.next({
      request: {
        headers: requestHeaders
      }
    })
  }

  const token = request.cookies.get(authConfig.cookieName)?.value
  const decoded = token ? verifyToken(token) : null

  if (!decoded) {
    const loginUrl = new URL(authConfig.redirects.login, request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  requestHeaders.set('x-admin-id', decoded.id)
  requestHeaders.set('x-admin-role', decoded.role)
  requestHeaders.set('x-admin-email', decoded.email)
  requestHeaders.set('x-admin-name', decoded.name)

  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  })
}

export const config = {
  matcher: ['/admin/:path*']
}
