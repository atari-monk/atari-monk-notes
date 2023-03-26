import * as tool from './../tool.js';
import { View } from './view.js';
import { TextNoteView } from './textNoteView.js';
import { CommandNoteView } from './commandNoteView.js';

export class NoteView extends View {
  createContent(data) {
    data.note.forEach((note) => {
      let newNote;
      if (note.hasOwnProperty('isCommand') && note.isCommand) {
        newNote = new CommandNoteView().createContent(data, note);
      } else {
        newNote = new TextNoteView().createContent(data, note);
      }
      document.body.appendChild(newNote);
    });
    this.#setupCopyBtns();
    this.#setupDetailBtns();
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
