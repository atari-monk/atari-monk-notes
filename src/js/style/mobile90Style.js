import { Styler } from './Styler.js';

export class Mobile90Style extends Styler {
  setStyle() {
    this._setVar('--font-size-title', 'var(--mobile90-font-size-title)');
    this._setVar('--font-color', 'var(--mobile90-font-color)');
  }
}
