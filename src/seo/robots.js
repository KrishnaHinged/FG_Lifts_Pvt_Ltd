/**
 * Dynamic Robots Policy Configurator
 * FG Lifts Pvt. Ltd.
 */

export function buildRobotsConfig(env = process.env.NODE_ENV) {
  const isProduction = env === 'production' && !process.env.VERCEL_ENV?.includes('preview')

  if (!isProduction) {
    return {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true
      }
    }
  }

  return {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
}

export default buildRobotsConfig
