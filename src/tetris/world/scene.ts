import * as THREE from 'three';
import {Tetris} from '../tetris';
import {Camera} from './camera';
import {Renderer} from './renderer';
import {Playfield} from './playfield';
import {AmbientLight} from './lights/AmbientLight';
import {TopLight} from './lights/topLight';

import {Tetrad} from '../player/tetrad';
import {Block} from '../player/block';

/**
 * Hej
 * @extends THREE.Scene
 */
export class Scene extends THREE.Scene {

  public blocks: Block[];
  public playfield: Playfield;

  public camera = new Camera(this);
  private renderer = new Renderer(this.camera);

  constructor(private game: Tetris, canvasContainer: HTMLCanvasElement) {
    super();

    this.blocks = [];
    this.playfield = new Playfield(game.gameSettings.playfieldWidth, game.gameSettings.playfieldHeight, this);
    canvasContainer.appendChild(this.renderer.domElement);
    this.createBounds();
  }

  /**
   * Creates the game world
   */
  public createBounds() {
    // Lights
    const ambientLight = new AmbientLight();
    const topLight = new TopLight(this.game.gameSettings.showTetradShadow);
    this.add(ambientLight);
    this.add(topLight);

    // floor
    const geom = new THREE.CylinderGeometry(8, 8.5, 0.5, 128, 1);
    const mat = new THREE.MeshPhongMaterial({
      color: '#d2d2d2',
      shading: THREE.FlatShading,
    });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.x = 6;
    mesh.position.y = 0.25;
    mesh.position.z = 0;
    mesh.receiveShadow = true;
    this.add(mesh);
  }

  public addTetradToScene(tetrad: Tetrad) {
    tetrad.blocks.map((block) => {
      this.blocks.push(block);
      this.add(block);
    });
  }

  public clearBlockRowFromScene(row: number): void {
    this.blocks.map((block) => {
      if (block.getPosition().y === 20 - row) {
        this.remove(block);
      } else if (block.getPosition().y > 20 - row) {
        block.setPosition({
          x: block.getPosition().x,
          y: block.getPosition().y - 1,
        });
      }
    });
  }

  public clearAllBlocks(): void {
    this.blocks.map((block) => {
      this.remove(block);
    });
    this.playfield = new Playfield(this.game.gameSettings.playfieldWidth, this.game.gameSettings.playfieldHeight, this);
  }

  public update(): void {
    this.blocks.map((block) => {
      block.update();
    });

    this.camera.update();
    this.renderer.render(this, this.camera);
  }

}
