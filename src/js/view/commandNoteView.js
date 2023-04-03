import * as tool from '../tool.js';
import { View } from './view.js';

export class CommandNoteView extends View {
  #injector;
  #beautifier;

  constructor(injector, beautifier) {
    super();
    this.#injector = injector;
    this.#beautifier = beautifier;
  }

  createContent(data, note) {
    return this.#createNote(data, note);
  }

  #createNote(data, note) {
    const noteEl = this._getParentElement('template-cmd', '.cmd');
    const newNote = this._getNewParent(noteEl);
    if (note.hasOwnProperty('title')) {
      this._templateChildHtml3(
        newNote,
        '.cmd-title',
        'title',
        this.#getTitle(note)
      );
    }
    const ulEl = newNote.querySelector('.cmd-ul');
    note.note.forEach((line) => {
      ulEl.appendChild(this.#createNoteItem(data, note, line));
    });
    this.#setupCopyBtns(newNote);
    return newNote;
  }

  #getTitle(note) {
    return Array.isArray(note.title) ? note.title.join('\n<br>') : note.title;
  }

  #createNoteItem(data, note, line) {
    const noteItemEl = this._getParentElement('template-cmd-item', 'div');
    const newNoteItem = this._getNewParent(noteItemEl);
    const noteTextEl = newNoteItem.querySelector('.cmd-item-note');
    const injectText = this.#injector.inject(line, data.inject);
    const beautified = this.#beautifier.beautify(note, injectText);
    this.#templateElement(note, noteTextEl, beautified);
    noteTextEl.classList.add('code');
    return newNoteItem;
  }

  #templateElement(note, noteTextEl, text) {
    if (note.hasOwnProperty('content') === false) {
      this._templateHtml(noteTextEl, 'note', text);
    } else {
      if (note.content === 'text')
        this._templateElText(noteTextEl, 'note', text);
      else if (note.content === 'html')
        this._templateHtml(noteTextEl, 'note', text);
    }
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
