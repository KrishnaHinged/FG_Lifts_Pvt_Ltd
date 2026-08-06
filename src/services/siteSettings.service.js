import * as settingsRepo from '@/repositories/siteSettings.repository'
import { createAuditLog } from '@/services/audit.service'

export async function fetchSiteSettings() {
  return settingsRepo.getSiteSettings()
}

export async function saveSiteSettings(data, adminUser) {
  const updated = await settingsRepo.updateSiteSettings(data, adminUser._id)

  if (adminUser) {
    try {
      await createAuditLog({
        action: 'settings_updated',
        performedBy: adminUser,
        targetType: 'SiteSettings',
        targetId: 'global_settings',
        details: { fieldsUpdated: Object.keys(data) }
      })
    } catch (e) {
      console.warn('Audit log creation failed for site settings:', e.message)
    }
  }

  return updated
}
