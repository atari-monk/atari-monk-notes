import * as tool from '../tool.js';
import { View } from './view.js';
import { AsideNoteView } from './asideNoteView.js';

export class CommandNoteView extends View {
  createContent(data, note) {
    const newNote = this.#createNote(note, data.inject);
    return newNote;
  }

  #createNote(note) {
    const noteEl = this._getParentElement('template-note-cmd', '.note');
    const newNote = this._getNewParent(noteEl);
    note.note.forEach((line) => {
      newNote.appendChild(this.#createNoteItem(note, line));
    });
    return newNote;
  }

  #createNoteItem(note, line) {
    const noteItemEl = this._getParentElement(
      'template-note-cmd-cmd',
      '.note-text'
    );
    const newNoteItem = this._getNewParent(noteItemEl);
    const noteTextEl = newNoteItem.querySelector('.note-note');
    this._templateHtml(noteTextEl, 'note', line);
    noteTextEl.classList.add('code');
    return newNoteItem;
  }
}
