import * as tool from '../tool.js';
import { View } from './view.js';

export class CommandNoteView extends View {
  #injector;

  constructor(injector) {
    super();
    this.#injector = injector;
  }

  createContent(data, note) {
    return this.#createNote(data, note);
  }

  #createNote(data, note) {
    const noteEl = this._getParentElement('template-cmd', '.cmd');
    const newNote = this._getNewParent(noteEl);
    const ulEl = newNote.querySelector('.cmd-ul');
    note.note.forEach((line) => {
      ulEl.appendChild(this.#createNoteItem(data, line));
    });
    this.#setupCopyBtns(newNote);
    return newNote;
  }

  #createNoteItem(data, line) {
    const noteItemEl = this._getParentElement('template-cmd-item', 'div');
    const newNoteItem = this._getNewParent(noteItemEl);
    const noteTextEl = newNoteItem.querySelector('.cmd-item-note');
    const injectText = this.#injector.inject(line, data.inject);
    this._templateHtml(noteTextEl, 'note', injectText);
    noteTextEl.classList.add('code');
    return newNoteItem;
  }

  #setupCopyBtns(newNote) {
    const lines = newNote.querySelectorAll('.cmd-item-note');
    const copyBtns = newNote.querySelectorAll('.cmd-item-copy');
    copyBtns.forEach((copyBtn, i) => {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(lines[i].innerText.trim());
      });
    });
  }
}
