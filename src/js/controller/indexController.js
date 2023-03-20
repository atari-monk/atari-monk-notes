import { DEBUG } from "../config.js";
import { Controller } from "./controller.js";
import model from "../model.js";
import detectOsView from "../view/detectOsView.js";
import styleBtnView from "../view/styleBtnView.js";
import navView from "../view/navView.js";
import linkListView from "./../view/linkListView.js";

class IndexController extends Controller {
  constructor() {
    super();
    navView.addHandlerRender(this.#controlIndex.bind(this));
  }

  async #controlIndex() {
    try {
      this._setPage();
      const data = await model.getPage(this._page ?? "index/index");
      DEBUG && console.log(data);
      const detectOsEl = detectOsView.createContent();
      const styleBtnEl = styleBtnView.createContent(
        detectOsView.currentSystem
      );
      navView.createContent(data, detectOsEl, styleBtnEl);
      linkListView.createContent(data);
    } catch (err) {
      console.log(err);
    }
  }
}

new IndexController();
