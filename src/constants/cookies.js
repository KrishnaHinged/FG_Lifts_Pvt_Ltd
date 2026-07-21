import authConfig from '@/config/auth'

export const COOKIES = Object.freeze({
  JWT: authConfig.cookieName,
  MAX_AGE_SECONDS: authConfig.maxAgeSeconds,
  OPTIONS: Object.freeze({
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/'
  })
})

export default COOKIES
