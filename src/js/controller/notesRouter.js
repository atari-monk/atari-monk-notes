import { DEBUG } from '../config.js';
import { Controller } from './controller.js';
import model from '../model.js';
import navView from '../view/navView.js';
import { NotesController } from './notesController.js';

class NotesRouter extends Controller {
  #notesController;
  constructor(notesController) {
    super();
    this.#notesController = notesController;
    navView.addHandlerRender(this.#controlNotes.bind(this));
  }

  async #controlNotes() {
    try {
      this._setPage();
      const data = await model.getPage(this._page);
      DEBUG && console.log(data);
      this.#notesController.controlNotes(data);
    } catch (err) {
      console.log(err);
    }
  }
}

new NotesRouter(new NotesController());
