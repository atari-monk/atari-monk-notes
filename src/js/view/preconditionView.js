import { View } from './view.js';

export class PreconditionView extends View {
  createContent(data) {
    if (data.precondition === undefined) return;
    document.body.appendChild(
      this.#createPrecondition(
        data.precondition,
        this._getParentElement('template-precondition', 'section'),
        this._getParentElement('template-precondition-item', 'li')
      )
    );
  }

  #createPrecondition(precondition, preconditionEl, itemEl) {
    const newPrecondition = this._getNewParent(preconditionEl);
    this._templateText(newPrecondition, 'h2', 'title', precondition.title);
    const listEl = newPrecondition.querySelector('ul');
    let newItem;
    precondition.list.forEach((text) => {
      newItem = this._getNewParent(itemEl);
      this._templateText(newItem, 'p', 'text', text);
      listEl.appendChild(newItem);
    });
    this._setAttribute(precondition, 'navId', newPrecondition, 'id');
    return newPrecondition;
  }
}

export default new PreconditionView();
