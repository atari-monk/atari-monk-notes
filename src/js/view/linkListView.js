import { View } from './view.js';

export class LinkListView extends View {
  createContent(data) {
    let newArticle = this._getNewParent(
      this._getParentElement('template-link-list', '.link-list')
    );
    this._filterMany(data.notes, 'section').forEach((sectionData) => {
      const newSection = this.#buildSection(
        sectionData,
        this._getParentElement('template-link-list-list', '.link-list-list')
      );
      this.#buildSectionLinks(
        sectionData,
        newSection.querySelector('ul'),
        this._getParentElement('template-link-list-item', '.link-list-item')
      );
      newArticle.appendChild(newSection);
    });
    document.body.appendChild(newArticle);
  }

  #buildSection(data, sectionEl) {
    const newSection = this._getNewParent(sectionEl);
    this._templateText(newSection, 'h3', 'title', data.title);
    return newSection;
  }

  #buildSectionLinks(data, parentEl, itemEl) {
    data.links.forEach((linkData) => {
      parentEl.appendChild(this._templateLink2(itemEl, 'link_text', linkData));
    });
  }
}

export default new LinkListView();
