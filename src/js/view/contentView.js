import { View } from './view.js';

export class ContentView extends View {
  createContent(note) {
    return this.#createView(note);
  }

  #createView(note) {
    const viewEl = this._getParentElement('template-content', 'div');
    const newView = this._getNewParent(viewEl);
    this._templateChildHtml2(
      newView,
      '.content-title',
      'title',
      this.#getTitle(note)
    );
    this._setAttribute(note, 'navId', newView, 'id');
    const itemEl = this._getParentElement('template-content-item', 'li');
    const olEl = newView.querySelector('ol');
    for (const link of note.links) {
      const newItem = this._getNewParent(itemEl);
      this._templateHtml(newItem, 'title', `${link.title}.`);
      if (link.hasOwnProperty('time')) {
        this._templateHtml(newItem, 'time', `${link.time}.`);
      } else {
        this._templateHtml(newItem, 'time', '');
      }
      const linkEl = newItem.querySelector('a');
      this._setAttribute(link, 'link', linkEl, 'href');
      olEl.appendChild(newItem);
    }
    return newView;
  }

  #getTitle(note) {
    return Array.isArray(note.title) ? note.title.join('\n<br>') : note.title;
  }
}
