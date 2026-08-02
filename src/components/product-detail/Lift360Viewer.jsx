'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import * as THREE from 'three'
import { Rotate3d, ZoomIn, ZoomOut, RotateCcw, Maximize, Minimize } from 'lucide-react'

export default function Lift360Viewer({
  panoramaUrl = '/images/360-gold.png',
  colorVariants = [],
  finishVariants = [],
  activeVariant: propActiveVariant,
  setActiveVariant: propSetActiveVariant,
  activeFinish: propActiveFinish,
  setActiveFinish: propSetActiveFinish
}) {
  // Fallbacks to local state if props are not provided
  const [localActiveVariant, localSetActiveVariant] = useState(0)
  const [localActiveFinish, localSetActiveFinish] = useState(0)

  const activeVariant = propActiveVariant !== undefined ? propActiveVariant : localActiveVariant
  const setActiveVariant = propSetActiveVariant || localSetActiveVariant
  const activeFinish = propActiveFinish !== undefined ? propActiveFinish : localActiveFinish
  const setActiveFinish = propSetActiveFinish || localSetActiveFinish

  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const rendererRef = useRef(null)
  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const meshRef = useRef(null)
  const animIdRef = useRef(null)
  const isDraggingRef = useRef(false)
  const prevMouseRef = useRef({ x: 0, y: 0 })
  const rotationRef = useRef({ lon: 0, lat: 0 })
  const speedRef = useRef({ x: 0, y: 0 })
  const isFocusedRef = useRef(false)

  const [loading, setLoading] = useState(true)
  const [isActivated, setIsActivated] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Shared helper function to cleanly dispose geometries, materials, and maps to prevent memory leaks on swap
  const disposeMesh = useCallback((mesh, scene) => {
    if (!mesh) return
    if (scene) scene.remove(mesh)
    if (mesh.geometry) mesh.geometry.dispose()
    if (Array.isArray(mesh.material)) {
      mesh.material.forEach(m => {
        if (m.map) m.map.dispose()
        m.dispose()
      })
    } else if (mesh.material) {
      if (mesh.material.map) mesh.material.map.dispose()
      mesh.material.dispose()
    }
  }, [])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Fullscreen change listener
  useEffect(() => {
    const handleFsChange = () => {
      const isFs = Boolean(document.fullscreenElement || document.webkitFullscreenElement)
      setIsFullscreen(isFs)
      if (containerRef.current && rendererRef.current && cameraRef.current) {
        const w = isFs ? window.innerWidth : containerRef.current.clientWidth
        const h = isFs ? window.innerHeight : containerRef.current.clientHeight
        cameraRef.current.aspect = w / h
        cameraRef.current.updateProjectionMatrix()
        rendererRef.current.setSize(w, h)
      }
    }

    document.addEventListener('fullscreenchange', handleFsChange)
    document.addEventListener('webkitfullscreenchange', handleFsChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFsChange)
      document.removeEventListener('webkitfullscreenchange', handleFsChange)
    }
  }, [])

  // Initialize Three.js scene
  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1200
    )
    camera.position.set(0, 0, 0.1)
    cameraRef.current = camera

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: false,
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    rendererRef.current = renderer

    // IntersectionObserver to pause rendering when off-screen
    let isVisible = true
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
    }, { threshold: 0.1 })
    observer.observe(container)

    // Animate loop
    function animate() {
      animIdRef.current = requestAnimationFrame(animate)
      if (!isVisible) return

      // Auto-rotate with decay when not dragging
      if (!isDraggingRef.current) {
        speedRef.current.x *= 0.95
        speedRef.current.y *= 0.95
        if (Math.abs(speedRef.current.x) < 0.05) {
          rotationRef.current.lon += 0.03
        } else {
          rotationRef.current.lon += speedRef.current.x
          rotationRef.current.lat += speedRef.current.y
        }
      }

      const lat = Math.max(-85, Math.min(85, rotationRef.current.lat))
      const phi = THREE.MathUtils.degToRad(90 - lat)
      const theta = THREE.MathUtils.degToRad(rotationRef.current.lon)

      camera.lookAt(
        500 * Math.sin(phi) * Math.cos(theta),
        500 * Math.cos(phi),
        500 * Math.sin(phi) * Math.sin(theta)
      )

      renderer.render(scene, camera)
    }
    animate()

    // Resize handler
    const handleResize = () => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', handleResize)
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current)
      if (meshRef.current) {
        disposeMesh(meshRef.current, scene)
      }
      renderer.dispose()
    }
  }, [disposeMesh])

  const activeVariantObj = colorVariants[activeVariant] || {}
  const activeFinishes = finishVariants.filter(f => f.isActive)
  const selectedFinishObj = activeFinishes[activeFinish]

  // Look up finish-specific panorama images
  let activePanoImages = activeVariantObj.panoramaImages || {}
  if (selectedFinishObj) {
    const finishTex = (activeVariantObj.finishTextures || []).find(
      ft => ft.finishName === selectedFinishObj.name
    )
    if (finishTex && finishTex.panoramaImages && Object.keys(finishTex.panoramaImages).length > 0) {
      activePanoImages = finishTex.panoramaImages
    }
  }

  const textureKey = JSON.stringify({
    variantIndex: activeVariant,
    finishName: selectedFinishObj?.name || 'default',
    pano: activePanoImages,
    sphere: activePanoImages.sphere || activeVariantObj.panorama || panoramaUrl
  })

  // Load / swap 3D elevator cabin room textures when activeVariant, activeFinish, or colorVariants change
  useEffect(() => {
    if (!sceneRef.current) return
    setLoading(true)

    const activeVariantObj = colorVariants[activeVariant] || {}
    const activeFinishes = finishVariants.filter(f => f.isActive)
    const selectedFinishObj = activeFinishes[activeFinish]

    let activePanoImages = activeVariantObj.panoramaImages || {}
    if (selectedFinishObj) {
      const finishTex = (activeVariantObj.finishTextures || []).find(
        ft => ft.finishName === selectedFinishObj.name
      )
      if (finishTex && finishTex.panoramaImages && Object.keys(finishTex.panoramaImages).length > 0) {
        activePanoImages = finishTex.panoramaImages
      }
    }

    const hasCubicSides = Boolean(
      activePanoImages.front ||
      activePanoImages.back ||
      activePanoImages.left ||
      activePanoImages.ceiling ||
      activePanoImages.floor
    )

    const loader = new THREE.TextureLoader()

    if (hasCubicSides) {
      // 6 Cubic Box faces: [+X Right, -X Left, +Y Ceiling, -Y Floor, +Z Front (Doors), -Z Back]
      // Elevator cabin geometry: Width: 500, Height: 833.33 (3:5 ratio wall height), Depth: 500 (1:1 ceiling/floor square)
      const faceUrls = [
        activePanoImages.left || activePanoImages.front || panoramaUrl,     // +X Right side (3:5 ratio)
        activePanoImages.left || activePanoImages.front || panoramaUrl,     // -X Left side (3:5 ratio)
        activePanoImages.ceiling || panoramaUrl,                           // +Y Ceiling (1:1 ratio square)
        activePanoImages.floor || panoramaUrl,                             // -Y Floor (1:1 ratio square)
        activePanoImages.front || panoramaUrl,                             // +Z Front Doors (3:5 ratio)
        activePanoImages.back || panoramaUrl,                              // -Z Back Wall (3:5 ratio)
      ]

      let loadedCount = 0
      const materials = new Array(6)

      faceUrls.forEach((url, i) => {
        loader.load(
          url,
          (tex) => {
            tex.colorSpace = THREE.SRGBColorSpace
            materials[i] = new THREE.MeshBasicMaterial({
              map: tex,
              side: THREE.BackSide
            })
            loadedCount++
            if (loadedCount === 6) {
              if (meshRef.current) disposeMesh(meshRef.current, sceneRef.current)
              // Realistic Elevator Cabin Box: Width 500, Height 833.33 (3:5 Wall Ratio), Depth 500 (1:1 Ceiling/Floor Ratio)
              const boxGeo = new THREE.BoxGeometry(500, 833.33, 500)
              const boxMesh = new THREE.Mesh(boxGeo, materials)
              sceneRef.current.add(boxMesh)
              meshRef.current = boxMesh
              setLoading(false)
            }
          },
          undefined,
          () => {
            materials[i] = new THREE.MeshBasicMaterial({ color: 0x222222, side: THREE.BackSide })
            loadedCount++
            if (loadedCount === 6) {
              if (meshRef.current) disposeMesh(meshRef.current, sceneRef.current)
              const boxGeo = new THREE.BoxGeometry(500, 833.33, 500)
              const boxMesh = new THREE.Mesh(boxGeo, materials)
              sceneRef.current.add(boxMesh)
              meshRef.current = boxMesh
              setLoading(false)
            }
          }
        )
      })
    } else {
      // Sphere equirectangular mode fallback
      const sphereUrl = activePanoImages.sphere || activeVariantObj.panorama || panoramaUrl || '/images/360-gold.png'
      loader.load(
        sphereUrl,
        (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace
          if (meshRef.current) disposeMesh(meshRef.current, sceneRef.current)

          const sphereGeo = new THREE.SphereGeometry(500, 60, 40)
          sphereGeo.scale(-1, 1, 1)
          const sphereMat = new THREE.MeshBasicMaterial({ map: texture })
          const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat)
          sceneRef.current.add(sphereMesh)
          meshRef.current = sphereMesh
          setLoading(false)
        },
        undefined,
        () => {
          setLoading(false)
        }
      )
    }
  }, [textureKey, disposeMesh])

  // Pointer handlers for drag rotation
  const handlePointerDown = useCallback((e) => {
    if (isMobile && !isActivated) return
    isDraggingRef.current = true
    prevMouseRef.current = { x: e.clientX, y: e.clientY }
    e.currentTarget.style.cursor = 'grabbing'
  }, [isMobile, isActivated])

  const handlePointerMove = useCallback((e) => {
    if (!isDraggingRef.current) return
    if (isMobile && !isActivated) return
    const dx = e.clientX - prevMouseRef.current.x
    const dy = e.clientY - prevMouseRef.current.y
    rotationRef.current.lon -= dx * 0.15
    rotationRef.current.lat += dy * 0.15
    speedRef.current = { x: -dx * 0.15, y: dy * 0.15 }
    prevMouseRef.current = { x: e.clientX, y: e.clientY }
  }, [isMobile, isActivated])

  const handlePointerUp = useCallback((e) => {
    isDraggingRef.current = false
    e.currentTarget.style.cursor = 'grab'
  }, [])

  // Native wheel listener for zooming
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleWheelNatively = (e) => {
      if (isDraggingRef.current || isFocusedRef.current) {
        e.preventDefault()
      }
      if (!cameraRef.current) return
      cameraRef.current.fov = Math.max(30, Math.min(100, cameraRef.current.fov + e.deltaY * 0.05))
      cameraRef.current.updateProjectionMatrix()
    }

    container.addEventListener('wheel', handleWheelNatively, { passive: false })
    return () => {
      container.removeEventListener('wheel', handleWheelNatively)
    }
  }, [])

  const zoomIn = () => {
    if (!cameraRef.current) return
    cameraRef.current.fov = Math.max(30, cameraRef.current.fov - 5)
    cameraRef.current.updateProjectionMatrix()
  }

  const zoomOut = () => {
    if (!cameraRef.current) return
    cameraRef.current.fov = Math.min(100, cameraRef.current.fov + 5)
    cameraRef.current.updateProjectionMatrix()
  }

  const resetView = () => {
    rotationRef.current = { lon: 0, lat: 0 }
    if (cameraRef.current) {
      cameraRef.current.fov = 75
      cameraRef.current.updateProjectionMatrix()
    }
  }

  const toggleFullscreen = () => {
    const elem = containerRef.current
    if (!elem) return

    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen()
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      }
    }
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[400px] overflow-hidden bg-fg-dark-2 transition-all ${
        isFullscreen ? 'fixed inset-0 z-[99999] rounded-none' : 'rounded-2xl'
      }`}
    >
      {/* WebGL canvas container */}
      <div
        className="absolute inset-0 cursor-grab outline-none"
        tabIndex={0}
        onFocus={() => { isFocusedRef.current = true }}
        onBlur={() => { isFocusedRef.current = false }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <canvas ref={canvasRef} className="block w-full h-full" />
      </div>

      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 bg-fg-dark-2 flex flex-col items-center justify-center z-10">
          <div className="w-16 h-16 rounded-full bg-fg-blue/10 border border-fg-blue/30 flex items-center justify-center mb-4 animate-pulse">
            <Rotate3d className="w-8 h-8 text-fg-blue animate-spin" style={{ animationDuration: '3s' }} />
          </div>
          <p className="font-mono text-xs text-fg-cream/60 tracking-wider uppercase">
            Loading 360° Cabin...
          </p>
        </div>
      )}

      {/* Controls - Top Right */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
        <button
          onClick={toggleFullscreen}
          className="w-9 h-9 rounded-lg bg-black/60 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center cursor-pointer hover:bg-black/80 hover:border-white/40 transition-all duration-200 shadow-md"
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Mode"}
        >
          {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
        </button>
        <button
          onClick={zoomIn}
          className="w-9 h-9 rounded-lg bg-black/50 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center cursor-pointer hover:bg-black/70 transition-colors duration-200"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={zoomOut}
          className="w-9 h-9 rounded-lg bg-black/50 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center cursor-pointer hover:bg-black/70 transition-colors duration-200"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={resetView}
          className="w-9 h-9 rounded-lg bg-black/50 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center cursor-pointer hover:bg-black/70 transition-colors duration-200"
          title="Reset View"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Drag hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 z-20 pointer-events-none">
        <span className="font-mono text-[10px] text-white/70 tracking-wider uppercase">
          Drag to rotate · Scroll to zoom
        </span>
      </div>



      {/* Mobile Interaction Activator Overlay */}
      {isMobile && !isActivated && (
        <div 
          onClick={() => setIsActivated(true)}
          className="absolute inset-0 bg-black/50 backdrop-blur-xs z-30 flex flex-col items-center justify-center cursor-pointer select-none p-6 text-center"
        >
          <div className="bg-black/70 border border-white/10 rounded-2xl px-6 py-5 flex flex-col items-center gap-2.5 max-w-[260px] shadow-2xl">
            <span className="font-mono text-xs text-white uppercase tracking-wider font-bold">
              360° Cabin Tour
            </span>
            <p className="font-sans text-[11px] text-white/70 leading-relaxed mb-1">
              Tap to enter 3D viewer and rotate cabin interior.
            </p>
            <button className="bg-[#0E4FB3] text-white font-mono text-[10px] tracking-widest uppercase px-4 py-2.5 rounded-lg border-none cursor-pointer hover:bg-fg-blue/90 transition-all font-bold">
              Tap to View
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
