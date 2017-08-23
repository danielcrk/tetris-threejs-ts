/**
 * This initiates the game and might possibly handle other stuff
 * on the page itself, outside the canvas.
 */

import {Tetris} from './tetris/tetris';

const canvasContainer = document.getElementById('canvas-container') as HTMLCanvasElement;
const game = new Tetris(canvasContainer);
