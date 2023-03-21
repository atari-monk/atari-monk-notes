import * as tool from './../tool.js';
import { View } from './view.js';

export class NoteView extends View {
  createContent(data) {
    const noteEl = this._getParentElement('template-note', '.note');
    const asideEl = this._getParentElement(
      'template-note-aside',
      '.note-aside'
    );
    data.note.forEach((note) => {
      const newNote = this.#createNote(note, noteEl);
      if (note.hasOwnProperty('params')) {
        this.#createAside(asideEl, note, newNote.querySelector('.note-text'));
      }
      document.body.appendChild(newNote);
    });
    this.#setupCopyBtns();
    this.#setupArrowBtns();
  }

  #createNote(note, noteEl) {
    const newNote = this._getNewParent(noteEl);
    this._templateChildHtml2(newNote, '.note-title', 'title', this.getTitle(note));
    const noteTextEl = newNote.querySelector('.note-note');
    this.#setNote(note, noteTextEl);
    this._setAttribute(note, 'navId', newNote, 'id');
    this._hideElement(note, 'isCopy', newNote, '.note-icon', 'hide');
    return newNote;
  }

  getTitle(note) {
    return Array.isArray(note.title)
      ? note.title.join('\n<br>')
      : note.title;
  }

  #setNote(note, noteTextEl) {
    if (note.note === undefined) {
      noteTextEl.classList.add('hide');
      return;
    }
    if (note.hasOwnProperty('params')) {
      this._templateHtml(
        noteTextEl,
        'note',
        this.#insertParams(note.note?.join('\n<br>') + '\n', note.params)
      );
    } else {
      this._templateHtml(noteTextEl, 'note', note.note?.join('\n<br>'));
    }
    this._centerText(note, noteTextEl);
  }

  #insertParams(text, params) {
    return text.format(...this.#getParams(params));
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

  #createAside(asideEl, note, textEl) {
    const newAside = this._getNewParent(asideEl);
    const parentEl = newAside.querySelector('p');
    const markEl = this._getParentElement('template-note-mark', 'mark');
    let j = 1;
    note.params.forEach((param, i) => {
      const newMark = this._getNewParent(markEl);
      newMark.classList.add(`mark-${j}`);
      j++;
      if (i > 0 && i % 6 === 0) j = 1;
      this._templateElText(newMark, 'text', param?.desc + '\n');
      parentEl.appendChild(newMark);
      parentEl.appendChild(this._createBr());
    });
    textEl.appendChild(newAside);
  }

  #setupCopyBtns() {
    const noteTexts = document.querySelectorAll('.note-text');
    const noteCopies = document.querySelectorAll('.note-copy');
    noteCopies.forEach((copyText, i) => {
      const noteText = noteTexts[i];
      copyText.addEventListener('click', () => {
        this.#copyText(noteText);
      });
    });
  }

  #copyText(noteText) {
    const title = noteText.querySelector('.note-title');
    const text = noteText.querySelector('.note-note');
    const aside = noteText.querySelector('aside');
    let asideTxt;
    if (aside) asideTxt = aside.querySelector('p').textContent;
    const txt = asideTxt
      ? `${title.textContent}${text.textContent}aside:\n${asideTxt}`
      : `${title.textContent}${text.textContent}`;
    navigator.clipboard.writeText(txt);
  }

  #setupArrowBtns() {
    document.querySelectorAll('.note-aside').forEach((aside) => {
      const btn = aside.querySelector('#note-aside-btn');
      const text = aside.querySelector('#note-aside-text');
      btn.classList.add('arrow-off');
      btn.addEventListener('click', () => {
        btn.classList.toggle('btn-off');
        btn.classList.toggle('btn-on');
        text.classList.toggle('hide');
      });
    });
  }
}

export default new NoteView();
