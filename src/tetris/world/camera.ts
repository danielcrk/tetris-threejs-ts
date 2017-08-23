import * as THREE from 'three';

/**
 * Hej
 * @extends THREE.PerspectiveCamera
 */
export class Camera extends THREE.PerspectiveCamera {

  private radius = 22;
  private targetAngle = 1.8;
  private currentAngle = 1.8;
  private amp = 0;

  private cameraLight: THREE.DirectionalLight;

  constructor(private scene: THREE.Scene) {
    super(70, window.innerWidth / window.innerHeight, 1, 10000);
    this.setupCameraLights();
  }

  public update() {
    const angleDelta = (this.targetAngle - this.currentAngle) * 0.08;
    this.currentAngle += angleDelta;

    this.position.x = 6 + this.radius * Math.cos(this.currentAngle);
    this.position.y = 8;
    this.position.z = this.radius * Math.sin(this.currentAngle);
    this.cameraLight.position.x = 6 + this.radius * Math.cos(this.currentAngle);
    this.cameraLight.position.z = this.radius * Math.sin(this.currentAngle);

    this.position.x = this.position.x + Math.sin(Math.random() * 100) * this.amp;
    this.position.y = this.position.y + Math.sin(Math.random() * 100) * this.amp;
    this.position.z = this.position.z + Math.sin(Math.random() * 100) * this.amp;

    this.lookAt(new THREE.Vector3(6, 8, 0));

    this.amp = (this.amp > 0) ? this.amp - 0.01 : 0;
  }

  public toggleSide() {
    this.targetAngle = (this.targetAngle === 1.8) ? 4.5 : 1.8;
  }

  public shake() {
    this.amp = 0.4;
  }

  private setupCameraLights() {
    this.cameraLight = new THREE.DirectionalLight(0xffffff, 0.3);
    this.cameraLight.position.set(6, 10, 100);
    this.cameraLight.target.position.set(6, 10, 0);
    this.scene.add(this.cameraLight);
    this.scene.add(this.cameraLight.target);
  }

}
