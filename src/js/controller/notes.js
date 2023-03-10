import { DEBUG } from "../config.js";
import { Controller } from "./controller.js";
import model from "../model.js";
import emptyView from "../view/emptyView.js";
import navView from "../../view/navView.js";
import metaView from "../../view/metaView.js";
import notesView from "../../view/notesView.js";
import summaryView from "../../view/summaryView.js";

class NotesController extends Controller {

  constructor() {
    super();
    emptyView.addHandlerRender(this.#controlNotes.bind(this));
  }

  async #controlNotes() {
    try {
      this._setPage();
      const data = await model.getPage(this._page);
      DEBUG && console.log(data);
      this.#setTitle(data.title);
      navView.render(data.nav);
      metaView.render(data.sections);
      emptyView.enableStyle("style");
      notesView.generateTemplate(data.notes);
      notesView.addHandlerClick(this.#copy);
      summaryView.render(data.summary);
      DEBUG && notesView._scrollToBottom();
    } catch (err) { }
  }

  #setTitle(title) {
    const titleEl = document.querySelector(".title");
    titleEl.innerText = title;
    titleEl.classList.remove("hide");
  }

  #copy(ev) {
    const id = ev.srcElement.id;
    const copyText = document.querySelectorAll(`#${id}`)[1];
    navigator.clipboard.writeText(copyText.innerText);
  }
}

new NotesController();
