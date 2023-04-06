import { DEBUG } from '../config.js';
import { Controller } from './controller.js';
import model from '../model.js';
import navView from '../view/navView.js';
import { NotesController } from './notesController.js';
import { KeyNotesController } from './keyNotesController.js';

class NotesRouter extends Controller {
  #notesController;
  #keyNotesController;
  constructor(notesController, keyNotesController) {
    super();
    this.#notesController = notesController;
    this.#keyNotesController = keyNotesController;
    navView.addHandlerRender(this.#controlNotes.bind(this));
  }

  async #controlNotes() {
    try {
      this._setPage();
      const data = await model.getPage(this._page);
      DEBUG && console.log(data);
      if (data.hasOwnProperty('isKey') === false || data.isKey === false)
        this.#notesController.controlNotes(data);
      else this.#keyNotesController.controlNotes(data);
    } catch (err) {
      console.log(err);
    }
  }
}

new NotesRouter(new NotesController(), new KeyNotesController());
