import nodemailer from 'nodemailer'
import path from 'path'
import fs from 'fs'
import emailConfig from '@/config/email'
import storageConfig from '@/config/storage'

let transporterInstance = null

function getTransporter() {
  if (transporterInstance) return transporterInstance

  const { host, port, secure, auth } = emailConfig.smtp
  if (!host || !auth.user || !auth.pass) {
    return null
  }

  transporterInstance = nodemailer.createTransport({
    host,
    port,
    secure,
    auth
  })
  return transporterInstance
}

export async function sendMail({ to, subject, html }) {
  const transporter = getTransporter()

  if (!transporter) {
    if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
      console.log(`[EmailAdapter] SMTP not configured. Simulated dispatch to ${to}: "${subject}"`)
      return { success: true, mode: 'simulated' }
    }
    try {
      const dir = path.join(process.cwd(), storageConfig.emailsPath)
      fs.mkdirSync(dir, { recursive: true })
      const file = path.join(dir, `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.html`)
      fs.writeFileSync(
        file,
        `<h2>To: ${to}</h2><h3>Subject: ${subject}</h3><hr/>${html}`
      )
      return { success: true, mode: 'development', file }
    } catch (fsErr) {
      console.warn('[EmailAdapter] Mail fallback write skipped:', fsErr.message)
      return { success: true, mode: 'simulated' }
    }
  }

  // Production Mode: Dispatch email via SMTP
  await transporter.sendMail({
    from: emailConfig.defaults.from,
    to,
    subject,
    html
  })

  return { success: true, mode: 'production' }
}

export default {
  sendMail
}
