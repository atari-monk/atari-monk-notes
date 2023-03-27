import * as tool from '../tool.js';
import { View } from './view.js';
import { AsideNoteView } from './asideNoteView.js';

export class CommandNoteView extends View {
  #asideView;

  constructor() {
    super();
    this.#asideView = new AsideNoteView();
  }

  createContent(data, note) {
    const { newNote, ulEl } = this.#createNote(note, data.inject);
    if (note.hasOwnProperty('params')) {
      ulEl.appendChild(this.#asideView.createContent(note));
    }
    return newNote;
  }

  #createNote(note) {
    const noteEl = this._getParentElement('template-cmd', '.cmd');
    const newNote = this._getNewParent(noteEl);
    const ulEl = newNote.querySelector('.cmd-ul');
    note.note.forEach((line) => {
      ulEl.appendChild(this.#createNoteItem(line));
    });
    return { newNote: newNote, ulEl: ulEl };
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
