import { Controller } from './controller.js';
import navView from '../view/navView.js';
import sourceView from './../view/sourceView.js';
import { NoteView } from './../view/noteView.js';
import descriptionView from './../view/descriptionView.js';
import preconditionView from './../view/preconditionView.js';
import debugView from './../view/debugView.js';
import { Injector } from './../tool/injector.js';
import { Beautifier } from './../tool/beautifier.js';

export class NotesController extends Controller {
  
  async controlNotes(data) {
    navView.createContent(data);
    sourceView.createContent(data);
    descriptionView.createContent(data);
    preconditionView.createContent(data);
    data.hasOwnProperty('isDebugViewOn') &&
      data.isDebugViewOn &&
      debugView.createContent();
    new NoteView(new Injector(), new Beautifier()).createContent(data);
  }
}