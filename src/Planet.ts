import * as THREE from 'three';


export default class Planet extends THREE.Mesh{
  private radius:number;

  constructor(x:number, y:number, z:number, textureFile: string){
        const texture = new THREE.TextureLoader().load(textureFile);
        super(
                new THREE.SphereGeometry(x, y, z),
                new THREE.MeshStandardMaterial({
                  map: texture
                })
            )
        this.radius = x;
	}

  getRadius(){
    return this.radius;
  }

  update(){
    this.rotation.y += 0.001;
  }

}