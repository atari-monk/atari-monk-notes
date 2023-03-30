export class ScreenOrientation {
  #style0;
  #style90;

  constructor(style0, style90) {
    this.#style0 = style0;
    this.#style90 = style90;
    screen.orientation.onchange = this.#handleChange.bind(this);
  }

  setStyle() {
    this.#setStyle();
  }

  #handleChange() {
    console.log(
      `angle: ${screen.orientation.angle}, width: ${screen.width}`
    );
    this.#setStyle();
  }

  #setStyle() {
    const angle = screen.orientation.angle;
    if (angle === 0) {
      this.#style0.setStyle();
    } else if (angle === 90) {
      this.#style90.setStyle();
    }
  }
}
