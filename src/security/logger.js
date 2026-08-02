/**
 * Centralized Enterprise Logging System
 * FG Lifts Pvt. Ltd.
 */

export const LOG_LEVELS = {
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
  SECURITY: 'SECURITY',
  AUDIT: 'AUDIT',
  DEBUG: 'DEBUG'
}

function formatLogMessage(level, message, details = {}) {
  return {
    timestamp: new Date().toISOString(),
    level,
    message,
    details,
    environment: process.env.NODE_ENV
  }
}

export function logInfo(message, details) {
  const payload = formatLogMessage(LOG_LEVELS.INFO, message, details)
  console.log(`[INFO] [${payload.timestamp}] ${message}`, details || '')
  return payload
}

export function logWarn(message, details) {
  const payload = formatLogMessage(LOG_LEVELS.WARN, message, details)
  console.warn(`[WARN] [${payload.timestamp}] ${message}`, details || '')
  return payload
}

export function logError(message, error) {
  const details = error instanceof Error ? { name: error.name, message: error.message, stack: error.stack } : error
  const payload = formatLogMessage(LOG_LEVELS.ERROR, message, details)
  console.error(`[ERROR] [${payload.timestamp}] ${message}`, details || '')
  return payload
}

export function logSecurityEvent(message, details) {
  const payload = formatLogMessage(LOG_LEVELS.SECURITY, message, details)
  console.warn(`[SECURITY_ALERT] [${payload.timestamp}] ${message}`, details || '')
  return payload
}

export function logAuditEvent(message, details) {
  const payload = formatLogMessage(LOG_LEVELS.AUDIT, message, details)
  console.log(`[AUDIT] [${payload.timestamp}] ${message}`, details || '')
  return payload
}

export default {
  logInfo,
  logWarn,
  logError,
  logSecurityEvent,
  logAuditEvent
}
