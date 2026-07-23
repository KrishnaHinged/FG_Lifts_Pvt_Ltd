/**
 * Core Web Vitals Collector Adapter
 * FG Lift Pvt. Ltd.
 */

export function reportWebVitals(metric) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${metric.name}:`, Math.round(metric.value * 10) / 10, metric.rating)
  }

  // Adapter point for telemetry / analytics exporters
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_label: metric.id,
      non_interaction: true,
    })
  }
}

export default reportWebVitals
