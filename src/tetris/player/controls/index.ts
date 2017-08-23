import {Player} from '../player';

import {KeyboardControls} from './keyboardControls';
import {TouchControls} from './touchControls';

/**
 * This instantiates the different control options
 */
export class Controls {
  constructor(private player: Player) {
    const keyboardControls = new KeyboardControls(player);
    const touchControls = new TouchControls(player);
  }
}
