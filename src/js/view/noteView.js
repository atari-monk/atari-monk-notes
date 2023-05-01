import * as tool from './../tool.js';
import { View } from './view.js';
import { TextNoteView } from './textNoteView.js';
import { NoteAsideView } from './noteAsideView.js';
import { AsideView } from './asideView.js';
import { AsideNoteView } from './asideNoteView.js';
import { CommandNoteView } from './commandNoteView.js';
import { CommandNoteAsideView } from './commandNoteAsideView.js';
import { ContentView } from './contentView.js';

export class NoteView extends View {
  #noteView;
  #noteAsideView;
  #asideView;
  #asideNoteView;
  #commandNoteView;
  #commandNoteAsideView;
  #contentView;
  #injector;
  #beautifier;

  constructor(injector, beautifier) {
    super();
    this.#injector = injector;
    this.#beautifier = beautifier;
    this.#noteView = new TextNoteView(this.#injector);
    this.#noteAsideView = new NoteAsideView(this.#injector);
    this.#asideView = new AsideView();
    this.#asideNoteView = new AsideNoteView();
    this.#commandNoteView = new CommandNoteView(
      this.#injector,
      this.#beautifier
    );
    this.#commandNoteAsideView = new CommandNoteAsideView(
      this.#injector,
      this.#beautifier
    );
    this.#contentView = new ContentView();
  }

  createContent(data) {
    data.note.forEach((note) => {
      let newNote;
      if (this.#isType(note, 'text')) {
        newNote = this.#noteView.createContent(data, note);
        if (note.hasOwnProperty('aside') && note.aside.isDetail) {
          const aside = this.#asideView.createContent(note);
          newNote.querySelector('.note-text').appendChild(aside);
        }
      } else if (this.#isType(note, 'note-aside')) {
        newNote = this.#getNoteAsideView(note, newNote, data);
      } else if (this.#isType(note, 'cmd')) {
        if (note.hasOwnProperty('aside')) {
          newNote = this.#commandNoteAsideView.createContent(
            data,
            this.#asideView.getTextParams(note),
            note
          );
          if (note.aside.hasOwnProperty('isDetail') && note.aside.isDetail) {
            const aside = this.#asideView.createContent(note);
            newNote.querySelector('.cmd-ul').appendChild(aside);
          }
        } else {
          newNote = this.#commandNoteView.createContent(note);
        }
      } else if (this.#isType(note, 'content')) {
        newNote = this.#contentView.createContent(note);
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
