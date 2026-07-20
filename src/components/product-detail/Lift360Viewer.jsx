'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import * as THREE from 'three'
import { Rotate3d, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'

export default function Lift360Viewer({ panoramaUrl = '/images/projects-collage.png', colorVariants = [] }) {
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
  const [activeVariant, setActiveVariant] = useState(0)
  const [isActivated, setIsActivated] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const currentPanorama = colorVariants.length > 0
    ? colorVariants[activeVariant]?.panorama || panoramaUrl
    : panoramaUrl

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
      1100
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

    // Sphere geometry — invert faces for interior view
    const geometry = new THREE.SphereGeometry(500, 60, 40)
    geometry.scale(-1, 1, 1) // flip normals inward

    const material = new THREE.MeshBasicMaterial({
      color: 0x333333,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)
    meshRef.current = mesh

    // Animate
    function animate() {
      animIdRef.current = requestAnimationFrame(animate)
      
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

    // Resize
    const handleResize = () => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current)
      
      // Memory disposal
      geometry.dispose()
      material.dispose()
      if (material.map) material.map.dispose()
      
      renderer.dispose()
    }
  }, [])

  // Load / swap texture when currentPanorama changes
  useEffect(() => {
    if (!meshRef.current) return
    setLoading(true)

    const loader = new THREE.TextureLoader()
    loader.load(
      currentPanorama,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace
        // Dispose old texture
        if (meshRef.current.material.map) {
          meshRef.current.material.map.dispose()
        }
        meshRef.current.material.map = texture
        meshRef.current.material.color.set(0xffffff)
        meshRef.current.material.needsUpdate = true
        setLoading(false)
      },
      undefined,
      () => {
        console.warn('360 texture failed to load:', currentPanorama)
        setLoading(false)
      }
    )
  }, [currentPanorama])

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

  // Native wheel listener to avoid passive event warnings and allow zooming
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

  return (
    <div className="relative w-full h-full min-h-[400px] rounded-2xl overflow-hidden bg-fg-dark-2">
      {/* WebGL canvas container */}
      <div
        ref={containerRef}
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
            Loading 360° View...
          </p>
        </div>
      )}

      {/* Controls - Top Right */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
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

      {/* Color Variants Selector */}
      {colorVariants.length > 1 && (
        <div className="absolute bottom-4 left-4 flex items-center gap-2 z-20">
          <span className="font-mono text-[10px] text-white/50 tracking-wider uppercase mr-1">
            Finish:
          </span>
          {colorVariants.map((v, i) => (
            <button
              key={i}
              onClick={() => setActiveVariant(i)}
              className={`w-7 h-7 rounded-full cursor-pointer border-2 transition-all duration-200 ${
                i === activeVariant
                  ? 'border-fg-blue scale-110 shadow-blue'
                  : 'border-white/30 hover:border-white/60'
              }`}
              style={{ backgroundColor: v.color || '#888' }}
              title={v.label || `Variant ${i + 1}`}
            />
          ))}
        </div>
      )}

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
