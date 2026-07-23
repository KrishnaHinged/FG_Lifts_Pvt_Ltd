# Performance Architecture Guide — FG Lift Pvt. Ltd.

## Overview
Performance system located in `src/performance/` manages caching, asset prefetching, image loading, Web Vitals metrics, and Three.js memory disposal.

## Features
- **Multi-tier Cache**: In-Memory and LocalStorage caching in `cache.js`.
- **Resource Prefetching**: Route & image preloader in `prefetch.js`.
- **Image Optimization**: Base64 SVG shimmer placeholders in `images.js`.
- **Web Vitals Telemetry**: Metrics exporter adapter in `webVitals.js`.
- **Three.js Disposal**: Geometry, material, and texture disposal in `optimization.js`.
- **Performance Hooks**: `useIntersection`, `useLazyLoad`, `usePrefetch`, `useImageLoader`, `useIdle`, `usePerformance`.
