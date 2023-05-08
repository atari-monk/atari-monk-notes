// eslint-disable-next-line no-unused-vars
import * as tool from '../tool.js';
import { DEBUG } from '../config.js';
import { View } from './view.js';

//todo: rename to NoteView
export class NoteAsideView extends View {
  #injector;

  constructor(injector) {
    super();
    this.#injector = injector;
  }

  createContent(data, note, params) {
    DEBUG && console.log('Note Aside View');
    return this.#createNote(note, params, data.inject);
  }

  #createNote(note, params, inject) {
    const noteEl = this._getParentElement('template-note', '.note');
    const newNote = this._getNewParent(noteEl);
    this._templateChildHtml2(
      newNote,
      '.note-title',
      'title',
      this.#getTitle(note)
    );
    const noteTextEl = newNote.querySelector('.note-note');
    this.#setNote(note, params, inject, noteTextEl);
    this._setAttribute(note, 'navId', newNote, 'id');
    this._hideElement(note, 'isCopy', newNote, '.note-icon', 'hide');
    if (this._hasProp(note, 'isCode') && note.isCode)
      noteTextEl.classList.add('code');
    return newNote;
  }

  #getTitle(note) {
    return Array.isArray(note.title) ? note.title.join('\n<br>') : note.title;
  }

  #setNote(note, params, inject, noteTextEl) {
    if (note.note === undefined) {
      noteTextEl.classList.add('hide');
      return;
    }
    let noteText = Array.isArray(note.note)
      ? note.note?.join('\n<br>')
      : note.note;
    if (params) noteText = this.#insertParams(noteText + '\n', params);
    noteText = this.#injector.inject(noteText, inject);
    this._templateHtml(noteTextEl, 'note', noteText);
    this._centerText(note, noteTextEl);
  }

  #insertParams(text, params) {
    return text.format(...params);
  }
}
