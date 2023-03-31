import { SYSTEM, DEBUG } from '../config.js';
import { View } from './view.js';

export class DetectOsView extends View {
  #currentSystem;
  #cardImg;

  get currentSystem() {
    return this.#currentSystem;
  }

  constructor() {
    super();
    this.#setSystemEnum();
  }

  #setSystemEnum() {
    const osName = this.#getSystem().toLowerCase();
    DEBUG && console.log(`OS: ${osName}`);
    switch (osName) {
      case 'windows':
        this.#currentSystem = SYSTEM.Windows;
        break;
      case 'android':
        this.#currentSystem = SYSTEM.Android;
        break;
      default:
        this.#currentSystem = SYSTEM.Unknown;
        break;
    }
  }

  #getSystem() {
    const uap = new UAParser();
    const os = uap.getOS();
    return os.name;
  }

  createContent() {
    const newCard = this._getNewParent(
      this._getParentElement('template-detect-os', '.card')
    );
    this.#cardImg = newCard.querySelector('#card-img');
    this.#setCard();
    return newCard;
  }

  #setCard() {
    switch (this.#currentSystem) {
      case SYSTEM.Unknown:
        this.#setUnknown();
        break;
      case SYSTEM.Android:
        this.#setAndroid();
        break;
      case SYSTEM.Windows:
        this.#setWindows();
        break;
      default:
        this.#setUnknown();
        break;
    }
  }

  #setUnknown() {
    this.#cardImg.classList.remove();
    this.#cardImg.classList.add('card-img-unknown');
    this.#cardImg.setAttribute('src', './src/img/unknown.png');
  }

  #setAndroid() {
    this.#cardImg.classList.remove();
    this.#cardImg.classList.add('card-img-android');
    this.#cardImg.setAttribute('src', './src/img/android.png');
  }

  #setWindows() {
    this.#cardImg.classList.remove();
    this.#cardImg.classList.add('card-img-windows');
    this.#cardImg.setAttribute('src', './src/img/windows.png');
  }
}

export default new DetectOsView();
