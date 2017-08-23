import {Tetris} from '../tetris';
import {Scene} from '../world/scene';
import {Tetrad} from './tetrad';
import {Controls} from './controls';
import {Position} from '../types';

/**
 * This represents the player state and handles the current tetrad.
 */
export class Player {

  public position: Position;
  public tetrad: Tetrad;
  public totalScore: number;

  private dropTime: number = 0;
  private dropDelay: number = 0;

  constructor(public game: Tetris, private scene: Scene) {
    const controls = new Controls(this);

    this.totalScore = 0;
    this.reset();
  }

  public reset() {
    this.position = {
      y: 0,
      x: Math.floor(this.game.gameSettings.playfieldWidth / 2) - 1,
    };
    this.tetrad = new Tetrad({
      x: this.position.x,
      y: this.position.y,
    });

    this.scene.addTetradToScene(this.tetrad);

    if (this.isColiding(this.scene)) {
      alert('Game over!');
      this.game.resetGame();
    }
  }

  public moveLeft(): void {
    this.position.x -= 1;
    if (this.isColiding(this.scene)) {
      this.position.x += 1;
    }
    this.tetrad.setPosition({x: this.position.x, y: this.position.y});
  }

  public moveRight(): void {
    this.position.x += 1;
    if (this.isColiding(this.scene)) {
      this.position.x -= 1;
    }
    this.tetrad.setPosition({x: this.position.x, y: this.position.y});
  }

  public moveDown(instant?: boolean) {
    if (this.dropDelay > 0) {
      return;
    } else {
      this.dropTime = Date.now();
    }

    this.position.y++;
    this.tetrad.setPosition({x: this.position.x, y: this.position.y}, instant);

    if (this.isColiding(this.scene)) {
      this.position.y--;
      this.tetrad.setPosition({x: this.position.x, y: this.position.y}, true);
      this.scene.playfield.cementPlayerTetrad(this);

      this.totalScore += this.scene.playfield.checkForFullRows();
      this.game.infoText.updateScore(this.totalScore);
      this.dropDelay = 500;

      setTimeout(() => {
        this.scene.camera.toggleSide();
        this.reset();
      }, 500);
    }
  }

  public drop() {
    if (this.dropDelay <= 0) {
      while (!this.isColiding(this.scene)) {
        this.moveDown(true);
      }
      this.scene.camera.shake();
    }
  }

  public rotate() {
    const pos = this.position.x;
    let offset = 1;
    this.tetrad.rotateTetradMatrix();
    while (this.isColiding(this.scene)) {
      this.position.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));

      if (offset > this.tetrad.matrix[0].length) {
        this.tetrad.rotateTetradMatrix();
        this.position.x = pos;
        return;
      }
    }

    this.tetrad.setPosition({x: this.position.x, y: this.position.y});
  }

  public update() {
    const timeStamp = Date.now();
    if (timeStamp >= this.dropTime + this.dropDelay + 1000)  {
      this.dropTime = timeStamp;
      this.dropDelay = 0;
      this.moveDown();
    }
  }

  private isColiding(scene: Scene) {
    console.log('came here');
    const [m, o] = [this.tetrad.matrix, this.position];
    console.log('not here tho');

    for (let y = 0; y < m.length; y++) {
      for (let x = 0; x < m[y].length; ++x) {
        if (m[y][x] !== 0 && (scene.playfield.matrix[y + o.y] && scene.playfield.matrix[y + o.y][x + o.x]) !== 0 ) {
          return true;
        }
      }
    }
    return false;
  }

}
