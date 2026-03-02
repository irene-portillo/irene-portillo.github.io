// particles.js — Three.js starfield
// Responds to scroll via window.scrollProgress (set by scroll.js)

let camera, scene, renderer, material
let mouseX = 0, mouseY = 0
let windowHalfX = window.innerWidth  / 2
let windowHalfY = window.innerHeight / 2

const BASE_ROT_X = 0.001
const BASE_ROT_Y = 0.002

init()
animate()

function init () {
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 5, 2000)
    camera.position.z = 500

    scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x000000, 0.0008)

    const geometry = new THREE.BufferGeometry()
    const vertices = []
    const size = 3000

    for (let i = 0; i < 20000; i++) {
        const x = (Math.random() * size + Math.random() * size) / 2 - size / 2
        const y = (Math.random() * size + Math.random() * size) / 2 - size / 2
        const z = (Math.random() * size + Math.random() * size) / 2 - size / 2
        vertices.push(x, y, z)
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))

    material = new THREE.PointsMaterial({
        size: 2,
        color: 0xffffff,
        transparent: true,
        opacity: 1,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false })
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)

    // Style the canvas so it sits fixed behind everything
    const canvas = renderer.domElement
    canvas.style.position = 'fixed'
    canvas.style.top      = '0'
    canvas.style.left     = '0'
    canvas.style.width    = '100vw'
    canvas.style.height   = '100vh'
    canvas.style.zIndex   = '0'
    canvas.style.pointerEvents = 'none'

    document.body.appendChild(canvas)

    document.body.addEventListener('pointermove', onPointerMove)
    window.addEventListener('resize', onWindowResize)
}

function onWindowResize () {
    windowHalfX = window.innerWidth  / 2
    windowHalfY = window.innerHeight / 2
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}

function onPointerMove (event) {
    mouseX = event.clientX - windowHalfX
    mouseY = event.clientY - windowHalfY
}

function animate () {
    requestAnimationFrame(animate)
    render()
}

function render () {
    // scroll progress 0 (top) → 1 (bottom), defaults to 0
    const t = window.scrollProgress ?? 0

    // Slow rotation as user scrolls deeper
    const rotSpeed = 1 - t * 0.88
    scene.rotation.x += BASE_ROT_X * rotSpeed
    scene.rotation.y += BASE_ROT_Y * rotSpeed

    // Dim particles: opacity 1 → 0.12
    material.opacity = Math.max(0.12, 1 - t * 0.88)

    // Pull camera back so particles appear to spread & disperse
    const targetZ = 500 + t * 350
    camera.position.z += (targetZ - camera.position.z) * 0.04

    // Mouse parallax, weakens as you scroll
    const strength = 2 * (1 - t * 0.7)
    camera.position.x += (mouseX * strength - camera.position.x) * 0.02
    camera.position.y += (-mouseY * strength - camera.position.y) * 0.02

    camera.lookAt(scene.position)
    renderer.render(scene, camera)
}
