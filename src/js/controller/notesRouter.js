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
      const pageData = await model.getPageData(this._page);
      const injectionsData = await model.getInjectionsData();
      const dataObj = {
        pageData: pageData,
        injectionsData: injectionsData,
      };
      DEBUG && console.log(pageData);
      if (
        pageData.hasOwnProperty('isKey') === false ||
        pageData.isKey === false
      )
        this.#notesController.controlNotes(dataObj);
      else this.#keyNotesController.controlNotes(dataObj);
      if (
        pageData.hasOwnProperty('isScrollToBottom') &&
        pageData.isScrollToBottom
      )
        navView._scrollToBottom();
    } catch (err) {
      console.log(err);
    }
  }
}

new NotesRouter(new NotesController(), new KeyNotesController());
