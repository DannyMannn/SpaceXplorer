import * as THREE from 'three'
import Planet from './Planet'
import Spaceship from './Spaceship'

export default class SpaceScene extends THREE.Scene{

	private readonly camera: THREE.PerspectiveCamera

	private readonly keyDown = new Set<string>()

	//private spaceship: THREE.Group
	private spaceship: Spaceship;
	private directionVector = new THREE.Vector3()
	private planets: Planet[] = [] 

	constructor(camera: THREE.PerspectiveCamera)
	{
		super()
		this.camera = camera
		this.spaceship =  new Spaceship();
	}

	async initialize(){
		// create spacesh
		//this.spaceship = await this.createBlaster()
		//this.spaceship =  new Spaceship();
		this.spaceship.init();
		this.add(this.spaceship)

		this.spaceship.position.z = 30
		this.spaceship.add(this.camera)

		this.camera.position.z = 15
		this.camera.position.y = 10

		const light = new THREE.DirectionalLight(0xFFFFFF, 5)
		const ambientLight = new THREE.AmbientLight(0xffffff)
		light.position.set(0, 0, 0.1)

		const sun = new Planet(20, 20, 20, 'assets/2k_sun.jpg');
		const earth = new Planet(10, 10, 10, "assets/earth.jpg");
		const jupiter = new Planet (15, 15, 15, 'assets/2k_jupiter.jpg');
		sun.position.x = 50;
		sun.position.z = 50;
		jupiter.position.x = 100;
		jupiter.position.z = 100;
		this.planets.push(earth, sun, jupiter);
		this.add(sun, earth, jupiter, ambientLight)

		document.addEventListener('keydown', this.handleKeyDown)
		document.addEventListener('keyup', this.handleKeyUp)
	}

	private handleKeyDown = (event: KeyboardEvent) => {
		this.keyDown.add(event.key.toLowerCase())
	}

	private handleKeyUp = (event: KeyboardEvent) => {
		this.keyDown.delete(event.key.toLowerCase())
	}

	private speed:number = 0.0
	private dirVec:number = 1.0
	private updateInput()
	{
		let speed = this.speed;
		if (!this.spaceship)
		{
			return
		}

		const shiftKey = this.keyDown.has('shift')

		if (!shiftKey)
		{
			if (this.keyDown.has('a') || this.keyDown.has('arrowleft'))
			{
				this.spaceship.rotateY(0.02)
			}
			else if (this.keyDown.has('d') || this.keyDown.has('arrowright'))
			{
				this.spaceship.rotateY(-0.02)
			}
		}

		const dir = this.directionVector
		let dirVec = this.dirVec;
		const ACCELERATION: number = 0.002;
		this.camera.getWorldDirection(dir)
		if (this.keyDown.has('w') || this.keyDown.has('arrowup')){
			speed += ACCELERATION;
			dirVec = 1.0;
			if(speed > 1.0){
				speed = 1.0;
			}
		}
		else if (this.keyDown.has('s') || this.keyDown.has('arrowdown')){
			speed -= ACCELERATION;
			dirVec = -1.0;
			if(speed < -1.0){
				speed = -1.0;
			}
		}
		if(speed < 0.001 && speed > -0.001){
			speed = 0;
		}
		else{
			if(speed > 0)
				speed -= 0.0005
			else 	
				speed += 0.0005
		}
		
		//this.spaceship.position.add(dir.clone().multiplyScalar(speed))
		this.spaceship.updatePosition(dir.clone().multiplyScalar(speed));
		this.dirVec = dirVec;
		this.speed = speed;
		
		const element: HTMLElement = document.getElementById("info")!
		//document.getElementById("info").innerHTML = `Speed: ${(this.speed).toFixed(3).toString()} Light Year per Hour`
		element.innerHTML = `Speed: ${(this.speed).toFixed(3).toString()} Light Year per Hour`
	}

	updatePlanets(){
		let shipVec = this.spaceship?.position.clone()
		let ship = this.spaceship
		this.planets.forEach(function(planet){
			planet.update();
			//collisions
			if (planet.position.distanceTo(shipVec) < planet.getRadius()){
				ship.handleCollision();
			}
		})
	}

	update(){
		// update
		this.updateInput()
		this.updatePlanets()
		//console.log(this.spaceship?.position)
	}
}