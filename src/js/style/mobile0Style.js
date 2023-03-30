import { Styler } from './Styler.js';

export class Mobile0Style extends Styler {
  setStyle() {
    this._setVar('--font-size-title', 'var(--mobile0-font-size-title)');
    this._setVar('--font-color', 'var(--mobile0-font-color)');
  }
}
