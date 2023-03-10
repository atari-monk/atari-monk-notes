import { DEBUG } from "../config.js";

export class Controller {
  _page;
  _type;

  _setPage() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this._page = urlParams.get("page");
    this._type = urlParams.get("type");
    DEBUG && console.log('page:' + this._page);
  }
}
