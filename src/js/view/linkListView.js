import { View } from './view.js';

export class LinkListView extends View {
  createContent(data) {
    this._filterMany(data.notes, 'section').forEach((sectionData) => {
      const newArticle = this.#buildSection(
        sectionData,
        this._getParentElement('template-link-list', '.link-list')
      );
      this.#buildSectionLinks(
        sectionData,
        newArticle.querySelector('ul'),
        this._getParentElement('template-link-list-item', '.link-list-item')
      );
      document.body.appendChild(newArticle);
    });
  }

  #buildSection(data, sectionEl) {
    const newSection = this._getNewParent(sectionEl);
    this._templateText(newSection, 'h3', 'title', data.title);
    this._setAttribute(data, 'navId', newSection, 'id');
    return newSection;
  }

  #buildSectionLinks(data, parentEl, itemEl) {
    data.links.forEach((linkData) => {
      parentEl.appendChild(this._templateLink2(itemEl, 'link_text', linkData));
    });
  }
}

export default new LinkListView();
