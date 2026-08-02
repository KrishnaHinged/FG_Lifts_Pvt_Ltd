/**
 * Bundle Footprint & Tree-Shaking Helper
 * FG Lifts Pvt. Ltd.
 */

export const bundleOptimization = {
  isDev: process.env.NODE_ENV === 'development',

  logMemoryUsage: () => {
    if (typeof window !== 'undefined' && window.performance && window.performance.memory) {
      const memory = window.performance.memory
      console.log(`[Memory Audit] Used: ${(memory.usedJSHeapSize / 1048576).toFixed(2)} MB / Limit: ${(memory.jsHeapSizeLimit / 1048576).toFixed(2)} MB`)
    }
  }
}

export default bundleOptimization
