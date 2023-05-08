import { View } from './view.js';
import { NoteAsideView } from './noteAsideView.js';
import { AsideView } from './asideView.js';
import { AsideNoteView } from './asideNoteView.js';
import { CommandNoteAsideView } from './commandNoteAsideView.js';
import { ContentView } from './contentView.js';

export class NoteView extends View {
  #noteAsideView;
  #asideView;
  #asideNoteView;
  #commandNoteAsideView;
  #contentView;
  #injector;
  #beautifier;

  constructor(injector, beautifier) {
    super();
    this.#injector = injector;
    this.#beautifier = beautifier;
    this.#noteAsideView = new NoteAsideView(this.#injector);
    this.#asideView = new AsideView();
    this.#asideNoteView = new AsideNoteView();
    this.#commandNoteAsideView = new CommandNoteAsideView(
      this.#injector,
      this.#beautifier
    );
    this.#contentView = new ContentView();
  }

  createContent(data) {
    data.note.forEach((note) => {
      let newNote;
      if (this.#isType(note, 'note-aside') || this.#isType(note, 'text')) {
        newNote = this.#getNoteAsideView(note, newNote, data);
      } else if (this.#isType(note, 'cmd')) {
        newNote = this.#getCmdView(note, newNote, data);
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

  #getCmdView(note, newNote, data) {
    if (this._hasProp(note, 'params')) {
      newNote = this.#commandNoteAsideView.createContent(
        data,
        this.#asideView.getTextParams(note),
        note
      );
      const aside = this.#asideView.createContent(note);
      newNote.querySelector('.cmd-ul').appendChild(aside);
    } else {
      newNote = this.#commandNoteAsideView.createContent(data, undefined, note);
    }
    return newNote;
  }

  #getNoteAsideView(note, newNote, data) {
    const asideNoteView = this.#asideNoteView.createContent(note);
    const isParams = this._hasProp(note, 'params');
    const params = this.#asideNoteView.getParams(note.params);
    newNote = this.#noteAsideView.createContent(data, note, params);
    if (isParams)
      newNote.querySelector('.note-text').appendChild(asideNoteView);
    return newNote;
  }

  #isType(note, type) {
    return this._hasProp(note, 'type') && note.type === type;
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
