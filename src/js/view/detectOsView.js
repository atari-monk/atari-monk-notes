import { DEBUG } from "../config.js";

export class DetectOsView {
  #system;
  #currentSystem;
  #cardImg;
  #cardh4;

  constructor() {
    this.#system = {
      Unknown: 'Unknown',
      Android: 'Android',
      Windows: 'Windows'
    };
    this.#setSystemEnum();
  }

  #setSystemEnum() {
    const osName = this.#getSystem().toLowerCase();
    DEBUG && console.log(`OS: ${osName}`);
    switch (osName) {
      case "windows":
        this.#currentSystem = this.#system.Windows;
        break;
      case "android":
        this.#currentSystem = this.#system.Android;
        break;
      default:
        this.#currentSystem = this.#system.Unknown;
        break;
    }
  }

  #getSystem() {
    const uap = new UAParser();
    const os = uap.getOS();
    return os.name;
  }

  createContent() {
    const template = document.getElementById("template-detect-os");
    const card = template.content.querySelector(".card");
    let newCard;
    newCard = document.importNode(card, true);
    this.#cardImg = newCard.querySelector("#card-img");
    this.#cardh4 = newCard.querySelector(".card-h4");
    this.#setCard();
    return newCard;
  }

  #setCard() {
    switch (this.#currentSystem) {
      case this.#system.Unknown:
        this.#setUnknown();
        break;
      case this.#system.Android:
        this.#setAndroid();
        break;
      case this.#system.Windows:
        this.#setWindows();
        break;
      default:
        this.#setUnknown();
        break;
    }
  }

  #setUnknown() {
    this.#cardImg.classList.remove();
    this.#cardImg.classList.add("card-img-unknown");
    this.#cardImg.setAttribute("src", "./src/img/unknown.png");
    this.#cardh4.textContent = "SYSTEM";
  }

  #setAndroid() {
    this.#cardImg.classList.remove();
    this.#cardImg.classList.add("card-img-android");
    this.#cardImg.setAttribute("src", "./src/img/android.png");
    this.#cardh4.textContent = this.#currentSystem.toString();
  }

  #setWindows() {
    this.#cardImg.classList.remove();
    this.#cardImg.classList.add("card-img-windows");
    this.#cardImg.setAttribute("src", "./src/img/windows.png");
    this.#cardh4.textContent = this.#currentSystem.toString();
  }
}

export default new DetectOsView();