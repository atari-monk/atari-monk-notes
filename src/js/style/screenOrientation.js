import { DEBUG } from '../config.js';

export class ScreenOrientation {
  #style0;
  #style90;
  #currentStyle;
  constructor(style0, style90) {
    this.#style0 = style0;
    this.#style90 = style90;
    screen.orientation.onchange = this.#handleChange.bind(this);
    this.#currentStyle = '?';
    this.#logInfo();
  }

  setStyle() {
    this.#setStyle();
  }

  #handleChange() {
    this.#setStyle();
    this.#logInfo();
  }

  #setStyle() {
    const angle = screen.orientation.angle;
    if (angle === 0) {
      this.#style0.setStyle();
      this.#currentStyle = 'mobile0';
    } else {
      this.#style90.setStyle();
      this.#currentStyle = 'mobile90';
    }
  }

  #logInfo() {
    const debugEl = document.querySelector('.debug-log');
    const info = this.#getInfo();
    DEBUG && console.log(info);
    if (debugEl) debugEl.innerHTML = info;
  }

  #getInfo() {
    return `orientation: ${screen.orientation.type}, angle: ${
      screen.orientation.angle
    }, width: ${screen.width}, height: ${screen.height}, style: ${
      this.#currentStyle
    }`;
  }
}
