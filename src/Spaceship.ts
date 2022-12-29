import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { Object3D } from 'three'

export default class Spaceship extends Object3D {
    private readonly mtlLoader = new MTLLoader()
	private readonly objLoader = new OBJLoader()
    private readonly  ACCELERATION: number = 0.002;
    private speed:number = 0.0;

    private prevX: number;
    private prevZ: number;
    constructor(){        
        super();
        this.prevX = this.position.x;
        this.prevZ = this.position.z;
    }
    public init(){
        this.createBlaster();
    }

    private async createBlaster()
	{
        //https://free3d.com/3d-model/ufo-saucer-v1--190141.html
		const mtl = await this.mtlLoader.loadAsync('assets/ufo/ufo1.mtl')
		mtl.preload()

		this.objLoader.setMaterials(mtl)

		const modelRoot = await this.objLoader.loadAsync('assets/ufo/ufo1.obj')

		this.add(modelRoot);

        this.scale.x = 0.1;
        this.scale.y = 0.1;
        this.scale.z = 0.1;
	}

    public updatePosition(dir: THREE.Vector3){
        this.prevX = this.position.x;
        this.prevZ = this.position.z;
        //this.position.add(dir.clone().multiplyScalar(speed))
        this.position.add(dir);
    }

    public handleCollision(){
        this.position.setX(this.prevX)
        this.position.setZ(this.prevZ);
    }
}