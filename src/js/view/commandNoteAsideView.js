import { View } from './view.js';

export class CommandNoteAsideView extends View {
  createContent(data, note, textParams) {
    return this.#createNote(data, note, textParams);
  }

  #createNote(data, note, textParams) {
    const noteEl = this._getParentElement('template-cmd', '.cmd');
    const newNote = this._getNewParent(noteEl);
    const ulEl = newNote.querySelector('.cmd-ul');
    if (note.note.length == 1) {
      const formatText = note.note.join().format(...textParams);
      const injectText = this.#injectText(formatText, data.inject);
      ulEl.appendChild(this.#createNoteItem(injectText));
    } else if (note.note.length > 1) {
      note.note.forEach((line, i) => {
        const formatText = line.format(...textParams);
        const injectText = this.#injectText(formatText, data.inject);
        ulEl.appendChild(this.#createNoteItem(injectText));
      });
    }
    this.#setupCopyBtns(newNote);
    return newNote;
  }

  #injectText(text, inject) {
    if (inject === undefined) return text;
    inject.forEach((item) => {
      if (text.includes(item.key)) text = this._injectText(text, item);
    });
    return text;
  }

  #createNoteItem(line) {
    const noteItemEl = this._getParentElement('template-cmd-item', 'div');
    const newNoteItem = this._getNewParent(noteItemEl);
    const noteTextEl = newNoteItem.querySelector('.cmd-item-note');
    this._templateHtml(noteTextEl, 'note', line);
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
