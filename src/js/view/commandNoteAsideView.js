// eslint-disable-next-line no-unused-vars
import * as tool from '../tool.js';
import { View } from './view.js';

export class CommandNoteAsideView extends View {
  #injector;
  #beautifier;

  constructor(injector, beautifier) {
    super();
    this.#injector = injector;
    this.#beautifier = beautifier;
  }

  createContent(data, textParams, note) {
    return this.#createNote(data, textParams, note);
  }

  #createNote(data, textParams, note) {
    const noteEl = this._getParentElement('template-cmd', '.cmd');
    const newNote = this._getNewParent(noteEl);
    if (this._hasProp(note, 'title')) {
      this._templateChildHtml3(
        newNote,
        '.cmd-title',
        'title',
        this.#getTitle(note)
      );
    }
    if (note.note === undefined) return newNote;
    const ulEl = newNote.querySelector('.cmd-ul');
    note.note.forEach((line) => {
      ulEl.appendChild(this.#createNoteItem(data, textParams, note, line));
    });
    this.#setupCopyBtns(newNote);
    return newNote;
  }

  #getTitle(note) {
    return Array.isArray(note.title) ? note.title.join('\n<br>') : note.title;
  }

  #createNoteItem(data, textParams, note, line) {
    const noteItemEl = this._getParentElement('template-cmd-item', 'div');
    const newNoteItem = this._getNewParent(noteItemEl);
    const noteTextEl = newNoteItem.querySelector('.cmd-item-note');
    let noteText = line;
    if (textParams) noteText = line.format(...textParams);
    noteText = this.#injector.inject(noteText, data.inject);
    noteText = this.#beautifier.beautify(note, noteText);
    noteText = noteText.replace(new RegExp(' < ', 'g'), '<');
    noteText = noteText.replace(new RegExp(' > ', 'g'), '>');
    this.#templateElement(note, noteTextEl, noteText);
    noteTextEl.classList.add('code');
    return newNoteItem;
  }

  #templateElement(note, noteTextEl, text) {
    if (this._hasProp(note, 'content') === false) {
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
