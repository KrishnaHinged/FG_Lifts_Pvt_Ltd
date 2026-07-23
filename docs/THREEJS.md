# Three.js 360° Customizer Architecture — FG Lift Pvt. Ltd.

## Overview
The 360-degree interactive elevator cabin customizer in `src/components/360/` renders interactive 3D cabin materials, lighting, walls, and flooring.

## Memory Disposal & Leak Prevention
- Always dispose WebGLRenderer instances on component unmount using `disposeThreeScene` from `@/performance/optimization`.
- Dispose textures, materials, and geometries when switching cabin variants or exiting customizer view.
