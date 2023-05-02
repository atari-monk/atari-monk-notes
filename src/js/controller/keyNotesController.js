import { Controller } from './controller.js';
import { KeyView } from '../view/keyView.js';
import navView from '../view/navView.js';
import sourceView from './../view/sourceView.js';
import { NoteView } from './../view/noteView.js';
import descriptionView from './../view/descriptionView.js';
import preconditionView from './../view/preconditionView.js';
import debugView from './../view/debugView.js';
import { Injector } from './../tool/injector.js';
import { Beautifier } from './../tool/beautifier.js';

export class KeyNotesController extends Controller {
  async controlNotes(dataObj) {
    const data = dataObj.pageData;
    navView.createContent(data);
    const keyView = new KeyView();
    keyView.createContent(data);
    keyView.protect();
    sourceView.createContent(data);
    descriptionView.createContent(data);
    preconditionView.createContent(data);
    data.hasOwnProperty('isDebugViewOn') &&
      data.isDebugViewOn &&
      debugView.createContent();
    new NoteView(
      new Injector(dataObj.injectionsData),
      new Beautifier()
    ).createContent(data);
  }
}
