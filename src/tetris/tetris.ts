import * as THREE from 'three';
import {Scene} from './world/scene';
import {Player} from './player/Player';
import {InfoText} from './world/infoText';

/**
 * The main class of the game, sets up a few properties
 * and instantiates needed game objects.
 */
export class Tetris {

  public scene: Scene;
  public player: Player;
  public infoText: InfoText;

  public gameSettings = {
    playfieldWidth: 12,
    playfieldHeight: 20,
    showTetradShadow: true,
  };

  private gamePaused: boolean;

  constructor(private canvasContainer: HTMLCanvasElement) {
    this.scene = new Scene(this, canvasContainer);
    this.player = new Player(this, this.scene);
    this.infoText = new InfoText(canvasContainer);

    this.gamePaused = false;
    this.gameLoop();
  }

  public pauseGame(): void {
    this.gamePaused = true;
  }

  public unPauseGame(): void {
    this.gamePaused = false;
  }

  public resetGame(): void {
    this.scene.clearAllBlocks();
    this.player.reset();
    this.infoText.updateScore(0);
  }

  private gameLoop(): void {
    if (!this.gamePaused) {
      this.player.update();
      this.scene.update();
    }
    requestAnimationFrame(this.gameLoop.bind(this));
  }

}
