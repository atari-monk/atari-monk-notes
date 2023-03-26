import * as tool from '../tool.js';
import { View } from './view.js';
import { AsideNoteView } from './asideNoteView.js';

export class TextNoteView extends View {
  createContent(data, note) {
    const newNote = this.#createNote(
      note,
      data.inject,
      this._getParentElement('template-note', '.note')
    );
    if (note.hasOwnProperty('params')) {
      newNote
        .querySelector('.note-text')
        .appendChild(new AsideNoteView().createContent(note));
    }
    return newNote;
  }

  #createNote(note, inject, noteEl) {
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
    this._hideElement(note, 'isCopy', newNote, '.note-icon', 'hide');
    if (note.hasOwnProperty('isCode') && note.isCode)
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
    if (note.hasOwnProperty('params')) {
      const noteWithParams = this.#insertParams(
        note.note?.join('\n<br>') + '\n',
        note.params
      );
      const noteInjected = this.#injectText(noteWithParams, inject);
      this._templateHtml(noteTextEl, 'note', noteInjected);
    } else {
      const fullNote = note.note?.join('\n<br>');
      const noteInjected = this.#injectText(fullNote, inject);
      this._templateHtml(noteTextEl, 'note', noteInjected);
    }
    this._centerText(note, noteTextEl);
  }

  #insertParams(text, params) {
    return text.format(...this.#getParams(params));
  }

  #injectText(text, inject) {
    if (inject === undefined) return text;
    inject.forEach((item) => {
      if (text.includes(item.key)) text = this._injectText(text, item);
    });
    return text;
  }

  #getParams(params) {
    let j = 1;
    const markEl = this._getParentElement('template-note-mark', 'mark');
    const result = [];
    params.forEach((param, i) => {
      const newMark = this._getNewParent(markEl);
      newMark.classList.add(`mark-${j}`);
      this._templateHtml(newMark, 'text', param?.name);
      j++;
      if (i > 0 && i % 6 === 0) j = 1;
      result.push(newMark.outerHTML);
    });
    return result;
  }
}
