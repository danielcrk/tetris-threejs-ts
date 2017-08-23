import {Player} from '../player';
import * as Hammer from 'hammerjs';

/**
 * This sets up touch controls in order to control the player object
 */
export class TouchControls {

  private lastPanDistance = 0;
  private lastPanDirection;
  private panOffset = 0;

  constructor(private player: Player) {
    this.setupInput();
  }

  private setupInput() {
    const canvasContainer = document.getElementById('canvas-container') as HTMLCanvasElement;
    const hammer = new Hammer.Manager(canvasContainer);

    hammer.add(new Hammer.Pan({
      threshold: 10,
    }));

    hammer.add(new Hammer.Tap({
      event: 'singletap',
    }));

    hammer.on('singletap', (e) => {
      this.player.rotate();
    });

    hammer.on('panmove', (e) => {
      if (e.direction !== this.lastPanDirection) {
        this.lastPanDirection = e.direction;
        this.panOffset = e.distance;
        this.lastPanDistance = 0;
      }

      if (Math.abs(this.panOffset - e.distance - this.lastPanDistance) > 20) {
        if (e.direction === 2) { // Panned left
          this.player.moveLeft();
        } else if (e.direction === 4) { // Panned right
          this.player.moveRight();
        } else if (e.direction === 16) { // Panned down
          if (e.velocity < 0.8) {
            this.player.moveDown();
          } else {
            this.player.drop();
          }
        }
        this.lastPanDistance = this.panOffset - e.distance;
      }
    });

    hammer.on('panend', () => {
      this.lastPanDistance = 0;
      this.panOffset = 0;
    });

  }

}
