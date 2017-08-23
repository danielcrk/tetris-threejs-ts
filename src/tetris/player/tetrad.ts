import {Block} from './block';
import generateRandomTetradShape from '../utils/tetradGenerator';
import {Position} from '../types';

/**
 * A cointer that creates, groups and handles 4 individua blocks
 * that make up a tetrad.
 */
export class Tetrad {

  public matrix: number[][];
  public blocks: Block[];

  private position: Position;

  constructor(position: Position) {
    const randomTetradShape = generateRandomTetradShape();
    this.matrix = randomTetradShape.matrix;
    this.blocks = [];

    this.position = position;
    this.setPosition(position);

    this.matrix.map((row, y) => {
      row.map((value, x) => {
        if (value !== 0) {
          const block = new Block({x: this.position.x + x, y: this.position.y - y}, randomTetradShape.color);
          this.blocks.push(block);
        }
      });
    });
  }

  public getPosition(): Position {
    return this.position;
  }

  public setPosition(position: Position, instant?: boolean): void {
    position.y = 20 - position.y;

    const deltaX = position.x - this.position.x;
    const deltaY = position.y - this.position.y;

    this.position.x = position.x;
    this.position.y = position.y;

    this.blocks.map((block) => {
      block.setPosition({
        x: block.getPosition().x + deltaX,
        y: block.getPosition().y + deltaY,
      }, instant);
    });
  }

  public rotateTetradMatrix(): void {
    // for (let y = 0; y < this.matrix.length; y++) {
    //   for (let x = 0; x < y; ++x) {
    //   [this.matrix[x][y], this.matrix[y][x]] = [this.matrix[y][x], this.matrix[x][y]];
    //   }
    // }
    this.matrix = this.transposeMatrix(this.matrix);
    this.matrix.forEach((row) => row.reverse());
    this.repositionBlocks();
  }

  private repositionBlocks(): void {
    let counter = 0;
    this.matrix.map((row, y) => {
      row.map((value, x) => {
        if (value !== 0) {
          const block = this.blocks[counter];
          block.setPosition({
            x: this.position.x + x,
            y: this.position.y - y,
           }, true);
          counter++;
        }
      });
    });
  }

  private transposeMatrix(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;

    const grid = [];
    for (let col = 0; col < cols; col++) {
      grid[col] = [];
    }
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        grid[col][row] = matrix[row][col];
      }
    }
    return grid;
  }

}
