import {Player} from '../player/player';
import {Scene} from '../world/scene';

/**
 * Hej
 */
export class Playfield {

  public matrix: number[][];

  constructor(w: number, h: number, private scene: Scene) {
    this.matrix = this.createMatrix(w, h);
  }

  public cementPlayerTetrad(player: Player): void {
    player.tetrad.matrix.map((row, y) => {
      row.map((value, x) => {
        if (value !== 0) {
          this.matrix[y + player.position.y][x + player.position.x] = value;
        }
      });
    });
  }

  public checkForFullRows(): number {
    let fullRowCount = 0;

    for (let y = 0; y < this.matrix.length; y++) {
      const row = this.matrix[y];

      let fullRow = true;
      row.map((value, x) => {
        if (value === 0) {
          fullRow = false;
        }
      });

      if (fullRow) {
        const emptyRow = this.matrix.splice(y, 1)[0].fill(0);
        this.matrix.unshift(emptyRow);
        this.scene.clearBlockRowFromScene(y);
        fullRowCount++;
        y = 0;
      }
    }

    if (fullRowCount > 3) {
      return 1200;
    } else if (fullRowCount > 2) {
      return 300;
    } else if (fullRowCount > 1) {
      return 100;
    } else if (fullRowCount > 0) {
      return 40;
    }

    return 0;
  }

  private createMatrix(w, h): number[][] {
    const matrix = [];
    while (h--) {
      matrix.push(new Array(w).fill(0));
    }
    return matrix;
  }

}
