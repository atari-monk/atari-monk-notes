import { Styler } from './Styler.js';

export class DesktopStyle extends Styler {
  setStyle() {
    this._setVar('--font-size-title', 'var(--desktop-font-size-title)');
    this._setVar('--font-color', 'var(--desktop-font-color)');
  }
}
