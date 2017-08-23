import * as THREE from 'three';

/**
 * Ambient light that lights every object evently from every side.
 * @extends THREE.AmbientLight
 */
export class AmbientLight extends THREE.AmbientLight {

  constructor() {
    super(0x696969, 1.4);
  }

}
