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
  #currentStyle;

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
    this.#currentStyle = 'style';
    this.#logInfo();
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
      this.#logInfo();
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
    this.#currentStyle = 'Desktop';
  }

  #enableMobile() {
    this.#screenOrientation.setStyle();
    this.#currentStyle = 'Mobile';
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

export default new StyleBtnView();
