import { View } from './view.js';

export class DescriptionView extends View {
  createContent(data) {
    document.body.appendChild(
      this.#createDescription(
        data.description,
        this._getParentElement('template-description', 'section')
      )
    );
  }

  #createDescription(description, descriptionEl) {
    const newDescription = this._getNewParent(descriptionEl);
    this._templateText(newDescription, 'h2', 'title', description.title);
    this._templateChildHtml(
      newDescription,
      'p',
      'text',
      description.description.join('<br>')
    );
    this._centerText(description, newDescription);
    this._setAttribute(description, 'navId', newDescription, 'id');
    return newDescription;
  }
}

export default new DescriptionView();
