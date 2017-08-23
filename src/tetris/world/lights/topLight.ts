import * as THREE from 'three';

/**
 * This is a top-down light that creates the "help shadow"
 * beneath the player tetrad.
 * @extends THREE.DirectionalLight
 */
export class TopLight extends THREE.DirectionalLight {

  constructor(shouldCastShadow: boolean) {
    super(0xffffff, .5);

    this.position.set(0, 40, 0);

    this.castShadow = shouldCastShadow;
    this.shadowCameraRight = 50;
    this.shadowCameraLeft = -50;
    this.shadowCameraTop =  50;
    this.shadowCameraBottom = -50;
    this.shadowCameraNear = 1;
    this.shadowCameraFar = 100;

    this.shadow.mapSize.width = 2048;
    this.shadow.mapSize.height = 2018;
  }

}
