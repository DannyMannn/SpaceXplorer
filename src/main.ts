import * as THREE from 'three'
import SpaceScene from './SpaceScene'

const width = window.innerWidth
const height = window.innerHeight

const renderer = new THREE.WebGLRenderer({
	canvas: document.getElementById('app') as HTMLCanvasElement
})
renderer.setSize(width, height)

const mainCamera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)

const scene = new SpaceScene(mainCamera)
scene.initialize()

function tick()
{
	scene.update()
	renderer.render(scene, mainCamera)
	requestAnimationFrame(tick)
}
function onWindowResize() {
    // Camera frustum aspect ratio
    mainCamera.aspect = window.innerWidth / window.innerHeight;
    // After making changes to aspect
    mainCamera.updateProjectionMatrix();
    // Reset size
    renderer.setSize(window.innerWidth, window.innerHeight);
}


window.addEventListener('resize', onWindowResize, false);
tick()
