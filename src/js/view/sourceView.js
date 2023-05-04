import { View } from './view.js';

export class SourceView extends View {
	createContent(data) {
		if (data.source === undefined) return;
		document.body.appendChild(
			this.#createSource(
				data.source,
				this._getParentElement('template-source', 'section'),
				this._getParentElement('template-source-link', 'li')
			)
		);
	}

	#createSource(source, sourceEl, itemEl) {
		const newSource = this._getNewParent(sourceEl);
		this._templateText(newSource, 'h2', 'title', source.title);
		const listEl = newSource.querySelector('ul');
		source.links.forEach((link) => {
			const newItem = this._getNewParent(itemEl);
			this._templateLink(newItem, 'link_text', link);
			listEl.appendChild(newItem);
		});
		this._setAttribute(source, 'navId', newSource, 'id');
		return newSource;
	}
}

export default new SourceView();
