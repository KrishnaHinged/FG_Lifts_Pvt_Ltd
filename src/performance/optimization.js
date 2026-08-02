/**
 * Three.js Memory Cleanup & Renderer Disposal Optimization Helper
 * FG Lifts Pvt. Ltd.
 */

export function disposeThreeScene(scene, renderer) {
  if (!scene) return

  // Traverse scene graph and dispose geometries, materials, and textures
  scene.traverse((object) => {
    if (object.geometry) {
      object.geometry.dispose()
    }

    if (object.material) {
      if (Array.isArray(object.material)) {
        object.material.forEach((mat) => disposeMaterial(mat))
      } else {
        disposeMaterial(object.material)
      }
    }
  })

  // Dispose renderer instance
  if (renderer) {
    renderer.dispose()
    if (renderer.domElement && renderer.domElement.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement)
    }
  }
}

function disposeMaterial(material) {
  if (!material) return
  material.dispose()

  // Dispose material textures
  for (const key of Object.keys(material)) {
    const value = material[key]
    if (value && typeof value === 'object' && 'minFilter' in value) {
      value.dispose()
    }
  }
}

export default {
  disposeThreeScene
}
