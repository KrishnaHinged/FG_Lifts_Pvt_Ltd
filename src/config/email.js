export const emailConfig = {
  smtp: {
    host: process.env.SMTP_HOST || '',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: (process.env.SMTP_PORT === '465'),
    auth: {
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || ''
    }
  },
  defaults: {
    from: `"FG Lifts Notifications" <${process.env.SMTP_USER || 'no-reply@fglifts.com'}>`
  },
  workerIntervalMs: 15000 // 15 seconds
}

export default emailConfig
