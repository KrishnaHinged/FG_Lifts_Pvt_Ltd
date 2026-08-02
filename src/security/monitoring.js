/**
 * Vendor-Agnostic Telemetry & Monitoring Adapter Facade
 * FG Lifts Pvt. Ltd.
 */

export const monitoring = {
  captureException: (error, context = {}) => {
    // Sentry / PostHog integration hook
    if (typeof window !== 'undefined' && window.Sentry) {
      window.Sentry.captureException(error, { extra: context })
    }
  },

  trackEvent: (eventName, properties = {}) => {
    // PostHog / Vercel Analytics / GA integration hook
    if (typeof window !== 'undefined') {
      if (window.posthog) {
        window.posthog.capture(eventName, properties)
      }
      if (window.gtag) {
        window.gtag('event', eventName, properties)
      }
    }
  },

  identifyUser: (userId, userTraits = {}) => {
    if (typeof window !== 'undefined' && window.posthog) {
      window.posthog.identify(userId, userTraits)
    }
  }
}

export default monitoring
