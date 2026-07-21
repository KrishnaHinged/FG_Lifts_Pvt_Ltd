/**
 * Project-specific ThreeJS 360 Elevator Cabin Viewer config helper.
 */

export function getVariantMapping(variantName, variantsList) {
  if (!variantName || !Array.isArray(variantsList)) return null
  return variantsList.find(v => v.name.toLowerCase() === variantName.toLowerCase()) || null
}

export function getFallbackTexture() {
  return '/images/placeholder-texture.jpg'
}

export function getCameraDefaults() {
  return {
    fov: 75,
    near: 0.1,
    far: 1000,
    position: [0, 0, 0.1]
  }
}

export function getAnimationSettings() {
  return {
    autoRotate: false,
    autoRotateSpeed: 0.5,
    enableDamping: true,
    dampingFactor: 0.05
  }
}

export default {
  getVariantMapping,
  getFallbackTexture,
  getCameraDefaults,
  getAnimationSettings
}
