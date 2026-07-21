import { connectDB } from './mongodb.js'
import * as emailQueueRepo from '@/repositories/emailQueue.repository'
import { sendMail } from '@/adapters/email.adapter'
import emailConfig from '@/config/email'

const POLL_INTERVAL = emailConfig.workerIntervalMs || 15000
const MAX_ATTEMPTS = 3

let workerStarted = false

async function processQueue() {
  try {
    await connectDB()
    const pending = await emailQueueRepo.getPendingQueueItems()

    for (const email of pending) {
      const attempts = (email.attempts || 0) + 1
      const lastAttemptAt = new Date()

      try {
        await sendMail({
          to: email.to,
          subject: email.subject,
          html: email.body
        })

        await emailQueueRepo.updateQueueItemStatus(email._id, {
          attempts,
          lastAttemptAt,
          status: 'sent',
          sentAt: new Date(),
          error: null
        })
      } catch (err) {
        const status = attempts >= MAX_ATTEMPTS ? 'failed' : 'pending'
        await emailQueueRepo.updateQueueItemStatus(email._id, {
          attempts,
          lastAttemptAt,
          status,
          error: err.message
        })
      }
    }
  } catch (err) {
    console.error('[EmailWorker] Error:', err.message)
  }
}

export function startEmailWorker() {
  if (workerStarted) return
  workerStarted = true
  console.log(`[EmailWorker] Started — polling every ${POLL_INTERVAL / 1000} seconds`)
  processQueue()
  setInterval(processQueue, POLL_INTERVAL)
}
