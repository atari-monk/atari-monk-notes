import { View } from './view.js';

export class DebugView extends View {
  createContent() {
    this.#createView();
  }

  #createView() {
    const viewEl = this._getParentElement('template-debug', '.debug');
    const newView = this._getNewParent(viewEl);
    this._templateChildHtml2(newView, '.debug-log', 'log', 'debug info');
    document.body.appendChild(newView);
  }
}

export default new DebugView();
