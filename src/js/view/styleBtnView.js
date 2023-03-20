import { SYSTEM, DEBUG } from './../config.js';
import { View } from './view.js';

export class StyleBtnView extends View {
  #styleOn;
  #none;
  #desktop;
  #mobile;

  constructor() {
    super();
    this.#styleOn = ['detectOSStyle', 'noteStyle'];
    this.#none = undefined;
    this.#desktop = undefined;
    this.#mobile = undefined;
  }

  createContent(currentSystem) {
    const newStyleBtn = this._getNewParent(
      this._getParentElement('template-style-btn', '.nav-item')
    );
    this.#setupStyle(newStyleBtn, currentSystem);
    return newStyleBtn;
  }

  #setupStyle(styleBtn, currentSystem) {
    try {
      this.#setBtns(styleBtn);
      this.#enableBasedOnDetectedSys(currentSystem);
    } catch (err) {
      DEBUG && console.log(err);
    }
  }

  #enableBasedOnDetectedSys(currentSystem) {
    switch (currentSystem) {
      case SYSTEM.Windows:
        this.#enableDesktop();
        break;
      case SYSTEM.Android:
        this.#enableMobile();
        break;
      case SYSTEM.Unknown:
        this.#enableDesktop();
        break;
      default:
        this.#enableDesktop();
        break;
    }
  }

  #setLinks(styleBtn) {
    this.#none = styleBtn.querySelector('#style-none');
    this.#desktop = styleBtn.querySelector('#style-desktop');
    this.#mobile = styleBtn.querySelector('#style-mobile');
  }

  #setBtns(styleBtn) {
    this.#setLinks(styleBtn);
    this.#none.addEventListener('click', () => {
      this.enableStyle('none');
    });
    this.#desktop.addEventListener('click', () => {
      this.#enableDesktop();
    });
    this.#mobile.addEventListener('click', () => {
      this.#enableMobile();
    });
  }

  #enableDesktop() {
    this.enableStyle('desktop');
    this.#indicateDesktop();
  }

  #enableMobile() {
    this.enableStyle('mobile');
    this.#indicateMobile();
  }

  #indicateDesktop() {
    this.#none.classList.add('style-btn-link-not-active');
    this.#mobile.classList.add('style-btn-link-not-active');
    this.#desktop.classList.remove('style-btn-link-not-active');
  }

  #indicateMobile() {
    this.#none.classList.add('style-btn-link-not-active');
    this.#desktop.classList.add('style-btn-link-not-active');
    this.#mobile.classList.remove('style-btn-link-not-active');
  }

  enableStyle(name) {
    for (let i = 0; i < document.styleSheets.length; i++) {
      let file = document.styleSheets.item(i);
      file.href.includes(name) || this.#isSyleOn(file.href)
        ? (file.disabled = false)
        : (file.disabled = true);
      DEBUG && console.log(file.href, 'enabled =', file.disabled === false);
    }
  }

  #isSyleOn(fileName) {
    let result = false;
    this.#styleOn.forEach((style) => {
      if (fileName.includes(style)) result = true;
    });
    return result;
  }
}

export default new StyleBtnView();
