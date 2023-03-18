import { DEBUG } from "../config.js";
import { Controller } from "./controller.js";
import model from "../model.js";
import navView from "../view/navView.js";
import detectOsView from "../view/detectOsView.js";
import styleBtnView from "../view/styleBtnView.js";
import sourceView from "./../view/sourceView.js";
import noteView from "./../view/noteView.js";
import descriptionView from "./../view/descriptionView.js";
import preconditionView from "./../view/preconditionView.js";

class NotesController extends Controller {
  constructor() {
    super();
    navView.addHandlerRender(this.#controlNotes.bind(this));
  }

  async #controlNotes() {
    try {
      this._setPage();
      const data = await model.getPage(this._page);
      DEBUG && console.log(data);
      const detectOsEl = detectOsView.createContent();
      const styleBtnEl = styleBtnView.createContent();
      navView.createContent(data, detectOsEl, styleBtnEl);
      sourceView.createContent(data);
      descriptionView.createContent(data);
      preconditionView.createContent(data);
      noteView.createContent(data);
    } catch (err) {
      console.log(err);
    }
  }
}

new NotesController();
