import * as auditRepo from '@/repositories/auditLog.repository'

export async function createAuditLog(data) {
  if (!data.action) {
    throw { status: 400, error: 'Audit log action is required.' }
  }
  
  return auditRepo.createLog({
    action: data.action,
    performedBy: {
      adminId: data.performedBy?.id || data.performedBy?._id || data.performedBy?.adminId,
      name: data.performedBy?.name || '',
      email: data.performedBy?.email || '',
      role: data.performedBy?.role || ''
    },
    targetId: data.targetId || '',
    targetType: data.targetType || '',
    details: data.details || null,
    ipAddress: data.ipAddress || ''
  })
}

export async function getAuditLogs(filters = {}) {
  const result = await auditRepo.getLogs(filters)
  // map or return
  return result
}
