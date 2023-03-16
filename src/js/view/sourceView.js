import { View } from './view.js';

export class SourceView extends View {
  createContent(data) {
    const source = this._filterOne(data, 'source');
    if (source === undefined) return;
    document.body.appendChild(
      this.#createSource(
        source,
        this._getParentElement('template-source', 'section'),
        this._getParentElement('template-source-link', 'li')
      )
    );
  }

  #createSource(source, sourceEl, itemEl) {
    const newSource = this._getNewParent(sourceEl);
    this._templateText(newSource, 'h2', 'title', source.title);
    const listEl = newSource.querySelector('ul');
    let newItem;
    source.links.forEach((link) => {
      newItem = this._getNewParent(itemEl);
      this._templateLink(newItem, 'link_text', link);
      listEl.appendChild(newItem);
    });
    this._setAttribute(source, 'navId', newSource, 'id');
    return newSource;
  }
}

export default new SourceView();
