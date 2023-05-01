import { View } from './view.js';

export class AsideView extends View {
  createContent(note) {
    return this.#createAside(note);
  }

  #createAside(note) {
    const asideEl = this._getParentElement(
      'template-note-aside',
      '.note-aside'
    );
    const newAside = this._getNewParent(asideEl);
    const parentEl = newAside.querySelector('p');
    const markEl = this._getParentElement('template-note-mark', 'mark');
    let j = 1;
    const params = this.#getData(note);
    params?.forEach((param, i) => {
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

  #getData(note) {
    return note.hasOwnProperty('params') ? note.params : undefined;
  }

  getTextParams(note) {
    const result = [];
    const params = this.#getData(note);
    if (params === undefined) return result;
    let j = 1;
    const markEl = this._getParentElement('template-note-mark', 'mark');
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
}
