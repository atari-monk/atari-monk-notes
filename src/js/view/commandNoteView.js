import * as tool from '../tool.js';
import { View } from './view.js';

export class CommandNoteView extends View {
  createContent(note) {
    return this.#createNote(note);
  }

  #createNote(note) {
    const noteEl = this._getParentElement('template-cmd', '.cmd');
    const newNote = this._getNewParent(noteEl);
    const ulEl = newNote.querySelector('.cmd-ul');
    note.note.forEach((line) => {
      ulEl.appendChild(this.#createNoteItem(line));
    });
    return newNote;
  }

  #createNoteItem(line) {
    const noteItemEl = this._getParentElement('template-cmd-item', 'div');
    const newNoteItem = this._getNewParent(noteItemEl);
    const noteTextEl = newNoteItem.querySelector('.cmd-item-note');
    this._templateHtml(noteTextEl, 'note', line);
    noteTextEl.classList.add('code');
    return newNoteItem;
  }
}
