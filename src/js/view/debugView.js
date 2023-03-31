import { View } from './view.js';

export class DebugView extends View {
  createContent() {
    this.#createView();
  }

  #createView() {
    const viewEl = this._getParentElement('template-debug', '.debug');
    const newView = this._getNewParent(viewEl);
    this._templateChildHtml2(newView, '.debug-log', 'log', this.#getInfo());
    document.body.appendChild(newView);
  }

  #getInfo() {
    return `orientation: ${screen.orientation.type}, angle: ${screen.orientation.angle}, width: ${screen.width}, height: ${screen.height}
    `;
  }
}

export default new DebugView();
