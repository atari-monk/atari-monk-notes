export class ScreenOrientation {
  #style0;
  #style90;
  #debugEl;
  constructor(style0, style90) {
    this.#style0 = style0;
    this.#style90 = style90;
    screen.orientation.onchange = this.#handleChange.bind(this);
    this.#debugEl = document.querySelector('#debug');
  }

  setStyle() {
    this.#setStyle();
  }

  #handleChange() {
    const log = `orientation: ${screen.orientation.type}, angle: ${screen.orientation.angle}, width: ${screen.width}, height: ${screen.height}`;
    console.log(log);
    this.#debugEl.innerHTML = log;
    this.#setStyle();
  }

  #setStyle() {
    const angle = screen.orientation.angle;
    if (angle === 0) {
      this.#style0.setStyle();
    } else {
      this.#style90.setStyle();
    }
  }
}
