import { DEBUG } from '../config.js';
import { View } from './view.js';

export class NoteAsideView extends View {
  #injector;

  constructor(injector) {
    super();
    this.#injector = injector;
  }

  createContent(data, note, params) {
    DEBUG && console.log('Note Aside View');
    if (params === undefined) return;
    const newNote = this.#createNote(note, params, data.inject);
    return newNote;
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
    const noteWithParams = this.#insertParams(
      note.note?.join('\n<br>') + '\n',
      params
    );
    const noteInjected = this.#injector.inject(noteWithParams, inject);
    this._templateHtml(noteTextEl, 'note', noteInjected);
    this._centerText(note, noteTextEl);
  }

  #insertParams(text, params) {
    return text.format(...params);
  }
}
