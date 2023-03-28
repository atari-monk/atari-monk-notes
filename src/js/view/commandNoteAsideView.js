import { View } from './view.js';

export class CommandNoteAsideView extends View {
  createContent(note, textParams) {
    return this.#createNote(note, textParams);
  }

  #createNote(note, textParams) {
    const noteEl = this._getParentElement('template-cmd', '.cmd');
    const newNote = this._getNewParent(noteEl);
    const ulEl = newNote.querySelector('.cmd-ul');
    note.note.forEach((line, i) => {
      const text =
        i < textParams.length ? this.#format(line, textParams[i], i) : line;
      ulEl.appendChild(this.#createNoteItem(text));
    });
    this.#setupCopyBtns(newNote);
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

  #format(line, param, i) {
    return line.replace(new RegExp(`{%${i}%}`), param);
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
