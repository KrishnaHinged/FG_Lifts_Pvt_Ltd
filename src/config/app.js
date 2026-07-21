export const appConfig = {
  env: process.env.NODE_ENV || 'development',
  url: process.env.NEXT_PUBLIC_URL || 'http://localhost:3000',
  isDev: process.env.NODE_ENV !== 'production'
}

export default appConfig
