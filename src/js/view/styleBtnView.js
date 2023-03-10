import { DEBUG } from "./../config.js"

export class StyleBtnView {
  #styleOn;

  constructor() {
    this.#styleOn = ['detectOSStyle', 'noteStyle'];
  }

  createContent() {
    const template = document.getElementById("template-style-btn");
    const styleBtn = template.content.querySelector(".nav-item");
    let newStyleBtn;
    newStyleBtn = document.importNode(styleBtn, true);
    this.#setupStyle(newStyleBtn);
    return newStyleBtn;
  }

  #setupStyle(styleBtn) {
    try {
      this.enableStyle("desktop");
      this.#setBtns(styleBtn);
    } catch (err) {
      DEBUG && console.log(err);
    }
  }

  #setBtns(styleBtn) {
    const none = styleBtn.querySelector("#style-none");
    const desktop = styleBtn.querySelector("#style-desktop");
    const mobile = styleBtn.querySelector("#style-mobile");
    none.addEventListener("click", () => this.enableStyle("none"));
    desktop.addEventListener("click", () => this.enableStyle("desktop"));
    mobile.addEventListener("click", () => this.enableStyle("mobile"));
  }

  enableStyle(name) {
    for (let i = 0; i < document.styleSheets.length; i++) {
      let file = document.styleSheets.item(i);
      file.href.includes(name) || this.#isSyleOn(file.href)
        ? (file.disabled = false)
        : (file.disabled = true);
      DEBUG && console.log(file.href, "enabled =", file.disabled === false);
    }
  }

  #isSyleOn(fileName) {
    let result = false;
    this.#styleOn.forEach(style => {
      if (fileName.includes(style))
        result = true;
    });
    return result;
  }
}

export default new StyleBtnView();