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
}
