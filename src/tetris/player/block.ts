import * as THREE from 'three';
import {Position} from '../types';

/**
 * The individual cube object in every tetroid.
 * @extends THREE.Mesh
 */
export class Block extends THREE.Mesh {

  private targetPosition: Position;
  private yOffset: number;

  constructor(position: Position, color: string) {

    const plotRoundedRect = (x, y, width, height, radius): THREE.Shape => {
      const roundedRect = new THREE.Shape();
      roundedRect.moveTo( x, y + radius );
      roundedRect.lineTo( x, y + height - radius );
      roundedRect.quadraticCurveTo( x, y + height, x + radius, y + height );
      roundedRect.lineTo( x + width - radius, y + height );
      roundedRect.quadraticCurveTo( x + width, y + height, x + width, y + height - radius );
      roundedRect.lineTo( x + width, y + radius );
      roundedRect.quadraticCurveTo( x + width, y, x + width - radius, y );
      roundedRect.lineTo( x + radius, y );
      roundedRect.quadraticCurveTo( x, y, x, y + radius );
      return roundedRect;
    };

    const extrudeSettings = {
      amount: 0.92,
      bevelSegments: 1,
      steps: 3, bevelSize: 0.05,
      bevelThickness: 0.05,
    };

    const roundedRect = plotRoundedRect(0, -0.45, 0.9, 0.9, 0.05);
    const newGeometry = new THREE.ExtrudeGeometry(roundedRect, extrudeSettings);
    const material = new THREE.MeshPhongMaterial({color, shading: THREE.FlatShading});
    material.transparent = true;
    material.opacity = -0.5;
    super(newGeometry, material);

    this.castShadow = true;
    this.receiveShadow = true;

    this.yOffset = 1;
    this.setPosition(position, true);
  }

  public setPosition(position: Position, instant?: boolean): void {
    this.targetPosition = position;
    if (instant) {
      this.position.set(position.x, position.y, -0.5);
    }
  }

  public getPosition(): Position {
    return this.targetPosition;
  }

  public update(): void {
    if (this.targetPosition.x > this.position.x) {
      this.position.x += 0.5;
    } else if (this.targetPosition.x < this.position.x) {
      this.position.x -= 0.5;
    } else if (this.targetPosition.y < this.position.y) {
      this.position.y -= 0.5;
    }

    if (this.material.opacity < 1) {
      this.material.opacity += (1 - this.material.opacity) * 0.1;
    }
  }

}
