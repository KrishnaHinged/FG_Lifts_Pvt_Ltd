/**
 * Project-specific client Analytics instrumentation helper.
 */

export function trackPageView(url) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
      page_path: url
    })
  }
}

export function trackCTAClick(label) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'click_cta', {
      event_category: 'engagement',
      event_label: label
    })
  }
}

export function trackInquiry(elevatorType) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'submit_inquiry', {
      event_category: 'lead_generation',
      event_label: elevatorType
    })
  }
}

export function trackNewsletter(email) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'newsletter_signup', {
      event_category: 'engagement',
      event_label: 'Footer Form'
    })
  }
}

export default {
  trackPageView,
  trackCTAClick,
  trackInquiry,
  trackNewsletter
}
