import {Player} from '../player';

/**
 * This sets up keyboard controls in order to control the player object
 */
export class KeyboardControls {

  constructor(private player: Player) {
    this.setupInput();
  }

  public setupInput() {
    document.addEventListener('keydown', (event) => {
      if (event.keyCode === 37) {
        this.player.moveLeft();
      } else if (event.keyCode === 39) {
        this.player.moveRight();
      } else if (event.keyCode === 40) {
        this.player.moveDown();
      } else if (event.keyCode === 38) {
        this.player.rotate();
      } else if (event.keyCode === 32) {
        this.player.drop();
      }
    });
  }

}
