import { View } from './view.js';

export class KeyView extends View {
  createContent(data) {
    if (data.hasOwnProperty('isKey') === false || data.isKey === false) return;
    document.body.appendChild(
      this._getNewParent(
        this._getParentElement('template-protect-body', '.protect-body')
      )
    );
  }
}
