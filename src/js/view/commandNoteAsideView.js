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
    const ulEl = newNote.querySelector('.cmd-ul');
    if (note.note === undefined) return newNote;
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
    const formatText = line.format(...textParams);
    const injectText = this.#injector.inject(formatText, data.inject);
    const beautified = this.#beautifier.beautify(note, injectText);
    const mystep = beautified.replace(new RegExp(' < ', 'g'), '<');
    const mystep2 = mystep.replace(new RegExp(' > ', 'g'), '>');
    this.#templateElement(note, noteTextEl, mystep2);
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
