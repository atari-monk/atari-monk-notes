export class Styler {
  #root;

  constructor() {
    this.#root = document.querySelector(':root');
  }

  _getVar(varName) {
    console.log(
      `${varName}:`,
      getComputedStyle(this.#root).getPropertyValue(varName)
    );
  }

  _setVar(varName, value) {
    this.#root.style.setProperty(varName, value);
  }

  _setStyle(name) {
    this._setVar('--font-color', `var(--${name}-font-color)`);
    this._setVar('--font-size-title', `var(--${name}-font-size-title)`);
    this._setVar('--font-size-index', `var(--${name}-font-size-index)`);
    this._setVar(
      '--font-size-system-card',
      `var(--${name}-font-size-system-card)`
    );
    this._setVar('--font-size-note', `var(--${name}-font-size-note)`);
    this._setVar('--font-size-code', `var(--${name}-font-size-code)`);
  }
}
