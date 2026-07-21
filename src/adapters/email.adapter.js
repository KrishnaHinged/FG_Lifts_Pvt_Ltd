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
    // Development Mode fallback: Write compile HTML output locally to file system
    const dir = path.join(process.cwd(), storageConfig.emailsPath)
    fs.mkdirSync(dir, { recursive: true })
    const file = path.join(dir, `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.html`)
    fs.writeFileSync(
      file,
      `<h2>To: ${to}</h2><h3>Subject: ${subject}</h3><hr/>${html}`
    )
    return { success: true, mode: 'development', file }
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
