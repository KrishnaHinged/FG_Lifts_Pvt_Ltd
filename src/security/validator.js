/**
 * Enterprise Centralized API Execution Pipeline Validator
 * FG Lifts Pvt. Ltd.
 */

import { validateSession } from './auth'
import { enforcePermission } from './permissions'
import { sanitizeObject } from './sanitizer'
import { logSecurityEvent, logError } from './logger'
import { checkRateLimit } from './rateLimit'

export async function createSecureApiPipeline(req, {
  requiredPermission = null,
  rateLimitKey = null,
  rateLimitConfig = { limit: 20, windowMs: 60000 },
  handler
}) {
  try {
    // 1. Rate Limiting Check
    if (rateLimitKey) {
      const ip = req.headers.get('x-forwarded-for') || '127.0.0.1'
      const rateCheck = checkRateLimit(`${rateLimitKey}_${ip}`, rateLimitConfig.limit, rateLimitConfig.windowMs)
      if (!rateCheck.allowed) {
        logSecurityEvent('RATE_LIMIT_EXCEEDED', { ip, rateLimitKey })
        return Response.json({ success: false, error: 'Too many requests. Please try again later.' }, { status: 429 })
      }
    }

    // 2. Authentication Check (if requiredPermission or auth endpoint)
    let session = { isValid: false, admin: null }
    if (requiredPermission) {
      session = validateSession(req)
      if (!session.isValid) {
        logSecurityEvent('UNAUTHORIZED_ACCESS_ATTEMPT', { path: req.url })
        return Response.json({ success: false, error: 'Unauthorized credentials' }, { status: 401 })
      }

      // 3. Permission Check
      const hasAccess = enforcePermission(session.admin, requiredPermission)
      if (!hasAccess) {
        logSecurityEvent('FORBIDDEN_PERMISSION_ATTEMPT', { admin: session.admin.email, requiredPermission })
        return Response.json({ success: false, error: 'Insufficient permissions' }, { status: 403 })
      }
    }

    // 4. Request Body Parse & Input Sanitization
    let body = null
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
      try {
        const rawBody = await req.json()
        body = sanitizeObject(rawBody)
      } catch {
        // Body might be empty or binary
      }
    }

    // 5. Business Logic Handler Execution
    const result = await handler({ req, session: session.admin, body })

    // 6. Safe Response Output
    return Response.json({ success: true, ...result })
  } catch (error) {
    logError('API_PIPELINE_UNHANDLED_ERROR', error)
    return Response.json({ success: false, error: 'Internal Server Processing Error' }, { status: 500 })
  }
}

export default createSecureApiPipeline
