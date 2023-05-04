import { DEBUG } from '../config.js';
import { View } from './view.js';

export class TextNoteView extends View {
  #injector;

  constructor(injector) {
    super();
    this.#injector = injector;
  }

  createContent(data, note) {
    DEBUG && console.log('Text Note View');
    return this.#createNote(note, data.inject);
  }

  #createNote(note, inject) {
    const noteEl = this._getParentElement('template-note', '.note');
    const newNote = this._getNewParent(noteEl);
    this._templateChildHtml2(
      newNote,
      '.note-title',
      'title',
      this.#getTitle(note)
    );
    const noteTextEl = newNote.querySelector('.note-note');
    this.#setNote(note, inject, noteTextEl);
    this._setAttribute(note, 'navId', newNote, 'id');
    this._showElement(note, 'isCopy', newNote, '.note-icon');
    if (this._hasProp(note, 'isCode') && note.isCode)
      noteTextEl.classList.add('code');
    return newNote;
  }

  #getTitle(note) {
    return Array.isArray(note.title) ? note.title.join('\n<br>') : note.title;
  }

  #setNote(note, inject, noteTextEl) {
    if (note.note === undefined) {
      noteTextEl.classList.add('hide');
      return;
    }
    const fullNote = Array.isArray(note.note)
      ? note.note?.join('\n<br>')
      : note.note;
    const noteInjected = this.#injector.inject(fullNote, inject);
    this._templateHtml(noteTextEl, 'note', noteInjected);
    this._centerText(note, noteTextEl);
  }
}
