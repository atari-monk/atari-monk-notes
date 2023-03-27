import * as tool from './../tool.js';
import { View } from './view.js';
import { TextNoteView } from './textNoteView.js';
import { NoteAsideView } from './noteAsideView.js';
import { AsideNoteView } from './asideNoteView.js';
import { CommandNoteView } from './commandNoteView.js';

export class NoteView extends View {
  #noteView;
  #noteAsideView;
  #asideNoteView;
  #commandNoteView;

  constructor() {
    super();
    this.#noteView = new TextNoteView();
    this.#noteAsideView = new NoteAsideView();
    this.#asideNoteView = new AsideNoteView();
    this.#commandNoteView = new CommandNoteView();
  }

  createContent(data) {
    data.note.forEach((note) => {
      let newNote;
      if (this.#isType(note, 'text')) {
        newNote = this.#noteView.createContent(data, note);
      } else if (this.#isType(note, 'note-aside')) {
        newNote = this.#getNoteAsideView(note, newNote, data);
      } else if (this.#isType(note, 'cmd')) {
        newNote = this.#commandNoteView.createContent(data, note);
      } else {
        newNote = this.#getNoteAsideView(note, newNote, data);
      }
      document.body.appendChild(newNote);
    });
    this.#setupCopyBtns();
    this.#setupDetailBtns();
  }

  #getNoteAsideView(note, newNote, data) {
    const asideNoteView = this.#asideNoteView.createContent(note);
    const isParams = note.hasOwnProperty('params');
    const params = this.#asideNoteView.getParams(note.params);
    newNote = this.#noteAsideView.createContent(data, note, params);
    if (isParams)
      newNote.querySelector('.note-text').appendChild(asideNoteView);
    return newNote;
  }

  #isType(note, type) {
    return note.hasOwnProperty('type') && note.type === type;
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
    if (text.classList.contains('code')) {
      navigator.clipboard.writeText(`${text.textContent}`);
    } else {
      let asideTxt;
      if (aside) asideTxt = aside.querySelector('p').textContent;
      const txt = asideTxt
        ? `${title.textContent}${text.textContent}aside:\n${asideTxt}`
        : `${title.textContent}${text.textContent}`;
      navigator.clipboard.writeText(txt);
    }
  }

  #setupDetailBtns() {
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
