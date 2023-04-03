import { DEBUG } from '../config.js';
import { Controller } from './controller.js';
import model from '../model.js';
import navView from '../view/navView.js';
import sourceView from './../view/sourceView.js';
import { NoteView } from './../view/noteView.js';
import descriptionView from './../view/descriptionView.js';
import preconditionView from './../view/preconditionView.js';
import debugView from './../view/debugView.js';
import { Injector } from './../tool/injector.js';
import { Beautifier } from './../tool/beautifier.js';

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
      navView.createContent(data);
      sourceView.createContent(data);
      descriptionView.createContent(data);
      preconditionView.createContent(data);
      data.hasOwnProperty('isDebugViewOn') &&
        data.isDebugViewOn &&
        debugView.createContent();
      new NoteView(new Injector(), new Beautifier()).createContent(data);
    } catch (err) {
      console.log(err);
    }
  }
}

new NotesController();
