import { SYSTEM, DEBUG } from './../config.js';
import { View } from './view.js';
import { DesktopStyle } from './../style/desktopStyle.js';
import { Mobile0Style } from '../style/mobile0Style.js';
import { Mobile90Style } from '../style/mobile90Style.js';
import { ScreenOrientation } from '../style/screenOrientation.js';

export class StyleBtnView extends View {
  #styleOn;
  #noneEl;
  #desktopEl;
  #mobileEl;
  #desktopStyle;
  #mobile0Style;
  #mobile90Style;
  #screenOrientation;

  constructor() {
    super();
    this.#styleOn = ['detectOSStyle', 'noteStyle'];
    this.#noneEl = undefined;
    this.#desktopEl = undefined;
    this.#mobileEl = undefined;
    this.#desktopStyle = new DesktopStyle();
    this.#mobile0Style = new Mobile0Style();
    this.#mobile90Style = new Mobile90Style();
    this.#screenOrientation = new ScreenOrientation(
      this.#mobile0Style,
      this.#mobile90Style
    );
    this.enableStyle('style');
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
    this.#noneEl = styleBtn.querySelector('#style-none');
    this.#desktopEl = styleBtn.querySelector('#style-desktop');
    this.#mobileEl = styleBtn.querySelector('#style-mobile');
  }

  #setBtns(styleBtn) {
    this.#setLinks(styleBtn);
    this.#noneEl.addEventListener('click', () => {
      this.enableStyle('none');
    });
    this.#desktopEl.addEventListener('click', () => {
      this.#enableDesktop();
    });
    this.#mobileEl.addEventListener('click', () => {
      this.#enableMobile();
    });
  }

  #enableDesktop() {
    this.#desktopStyle.setStyle();
    //this.#indicateDesktop();
  }

  #enableMobile() {
    this.#screenOrientation.setStyle();
    //this.#mobile0Style.setStyle();
    //this.#indicateMobile();
  }

  #indicateDesktop() {
    this.#noneEl.classList.add('style-btn-link-not-active');
    this.#mobileEl.classList.add('style-btn-link-not-active');
    this.#desktopEl.classList.remove('style-btn-link-not-active');
  }

  #indicateMobile() {
    this.#noneEl.classList.add('style-btn-link-not-active');
    this.#desktopEl.classList.add('style-btn-link-not-active');
    this.#mobileEl.classList.remove('style-btn-link-not-active');
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
