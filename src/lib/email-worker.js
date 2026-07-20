import { connectDB } from './mongodb.js'
import EmailQueue from '@/models/EmailQueue'
import nodemailer from 'nodemailer'
import path from 'path'
import fs from 'fs'

const POLL_INTERVAL = 15000   // 15 seconds
const MAX_ATTEMPTS  = 3

let workerStarted = false

function getTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })
}

async function processQueue() {
  try {
    await connectDB()
    const pending = await EmailQueue.find({
      status: 'pending',
      attempts: { $lt: MAX_ATTEMPTS }
    }).limit(10)

    for (const email of pending) {
      email.attempts      += 1
      email.lastAttemptAt  = new Date()

      const transporter = getTransporter()

      if (!transporter) {
        // Dev mode — write compiled HTML to /scratch/emails/
        const dir  = path.join(process.cwd(), 'scratch', 'emails')
        fs.mkdirSync(dir, { recursive: true })
        const file = path.join(dir, `${Date.now()}-${email._id}.html`)
        fs.writeFileSync(file, `
          <h2>To: ${email.to}</h2>
          <h3>Subject: ${email.subject}</h3>
          <hr/>
          ${email.body}
        `)
        email.status = 'sent'
        email.sentAt = new Date()
      } else {
        try {
          await transporter.sendMail({
            from:    `"FG Lift" <${process.env.SMTP_USER}>`,
            to:      email.to,
            subject: email.subject,
            html:    email.body,
          })
          email.status = 'sent'
          email.sentAt = new Date()
        } catch (err) {
          email.error  = err.message
          email.status = email.attempts >= MAX_ATTEMPTS ? 'failed' : 'pending'
        }
      }

      await email.save()
    }
  } catch (err) {
    console.error('[EmailWorker] Error:', err.message)
  }
}

export function startEmailWorker() {
  if (workerStarted) return
  workerStarted = true
  console.log('[EmailWorker] Started — polling every 15 seconds')
  processQueue()
  setInterval(processQueue, POLL_INTERVAL)
}
