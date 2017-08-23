import * as THREE from 'three';

/**
 * Hej
 * @extends THREE.WebGLRenderer
 */
export class Renderer extends THREE.WebGLRenderer {

  constructor(private camera: THREE.PerspectiveCamera) {
    super({
      alpha: true,
      antialias: false,
    });

    this.setClearColor( 0xffffff, 0 );
    this.setPixelRatio(window.devicePixelRatio);
    this.setSize( window.innerWidth, window.innerHeight );
    this.shadowMap.enabled = true;

    this.addEventListeners();
  }

  private addEventListeners() {
    window.addEventListener('resize', () => {

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.setSize(window.innerWidth, window.innerHeight);

    });
  }

}
