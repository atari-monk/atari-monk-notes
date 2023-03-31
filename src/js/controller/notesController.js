import { DEBUG } from '../config.js';
import { Controller } from './controller.js';
import model from '../model.js';
import navView from '../view/navView.js';
import sourceView from './../view/sourceView.js';
import noteView from './../view/noteView.js';
import descriptionView from './../view/descriptionView.js';
import preconditionView from './../view/preconditionView.js';
import debugView from './../view/debugView.js';

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
      if (data.hasOwnProperty('isDebugViewOn') && data.isDebugViewOn) {
        debugView.createContent();
      }
      navView.createContent(data);
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
