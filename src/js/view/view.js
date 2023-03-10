import { DEBUG } from "./../config.js";

export class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      DEBUG && console.log("error");
      return;
    }
    this._data = data;
    
    this._parentElement.classList.remove("hide");
  }

  _scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
    console.log("scrolling to bottom!");
  }
}
