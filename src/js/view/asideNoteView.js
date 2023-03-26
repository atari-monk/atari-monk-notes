import { View } from './view.js';

export class AsideNoteView extends View {
  createContent(note) {
    return this.#createAside(
      this._getParentElement('template-note-aside', '.note-aside'),
      note
    );
  }

  #createAside(asideEl, note) {
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
    return newAside;
  }
}
