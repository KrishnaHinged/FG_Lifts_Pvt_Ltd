/**
 * Project-specific Email variables blueprint helper.
 */

export function compileTemplate(rawHtml, variables = {}) {
  let compiled = rawHtml
  for (const [key, value] of Object.entries(variables)) {
    compiled = compiled.replaceAll(`{{${key}}}`, value || '')
  }
  return compiled
}

export function getTemplateVariables(templateName) {
  const blueprintMap = {
    inquiry_received: ['name', 'product', 'company', 'referenceId'],
    lead_assigned: ['executiveName', 'clientName', 'clientPhone', 'clientCompany', 'product', 'assignedBy', 'adminUrl'],
    newsletter_welcome: ['name']
  }
  return blueprintMap[templateName] || []
}

export default {
  compileTemplate,
  getTemplateVariables
}
