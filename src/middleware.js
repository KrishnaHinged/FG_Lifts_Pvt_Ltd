import { NextResponse } from 'next/server'
import { verifyToken, COOKIE_NAME } from '@/lib/auth'

// Paths under /admin that DO NOT require authentication
const PUBLIC_ADMIN_PATHS = ['/admin/login']

export async function middleware(request) {
  const { pathname } = request.nextUrl

  // Only run this middleware on routes matching /admin
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', pathname)

  // Allow public admin paths to load without a redirect loop
  if (PUBLIC_ADMIN_PATHS.some(p => pathname.startsWith(p))) {
    return NextResponse.next({
      request: {
        headers: requestHeaders
      }
    })
  }

  // Extract token from request cookies
  const token = request.cookies.get(COOKIE_NAME)?.value
  const decoded = token ? verifyToken(token) : null

  // If unauthorized, redirect to the login gate, saving the redirect path
  if (!decoded) {
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Inject user details into downstream request headers
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
