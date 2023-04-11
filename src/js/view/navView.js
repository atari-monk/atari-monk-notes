import { HOME } from '../config.js';
import { View } from './view.js';
import detectOsView from '../view/detectOsView.js';

export class NavView extends View {
  #navList;

  createContent(data) {
    const nav = this.#createNav();
    this.#navList = nav.querySelector('.nav-ul');
    this.#createHomeLink(data);
    this.#createPageSectionLinks(data);
    document.body.appendChild(this.#createTitle(data));
    this.#setPageMetaTitle(data);
    document.body.appendChild(nav);
    document.body.appendChild(detectOsView.createContent());
  }

  #createTitle(data) {
    const newtitle = this._getNewParent(
      this._getParentElement('template-title', '.title')
    );
    this._templateText(newtitle, '.title-title', 'title', data.title);
    return newtitle;
  }

  #createNav() {
    return this._getNewParent(this._getParentElement('template-nav', '.nav'));
  }

  #createHomeLink(data) {
    const navData = data.nav.filter(
      (d) => d.hasOwnProperty('link') && d.link === 'home'
    )[0];
    if (navData === undefined) return;
    const newNavItem = this._getNewParent(
      this._getParentElement('template-nav-item', '.nav-item')
    );
    this.#createHomePageLink(newNavItem, navData);
    this.#navList.appendChild(newNavItem);
  }

  #createPageSectionLinks(data) {
    const nav = data.nav.filter((d) => d.hasOwnProperty('link') === false);
    nav.forEach((navData) => {
      const newNavItem = this._getNewParent(
        this._getParentElement('template-nav-item', '.nav-item')
      );
      this.#createPageSectionLink(newNavItem, navData);
      this.#navList.appendChild(newNavItem);
    });
  }

  #createHomePageLink(newNavItem, navData) {
    this._templateLink(
      newNavItem,
      'nav_link',
      {
        link: HOME,
        text: navData.title,
      },
      '.nav-item-link'
    );
  }

  #createPageSectionLink(newNavItem, navData) {
    this._templateLink(
      newNavItem,
      'nav_link',
      {
        link: `#${navData.title.toLowerCase()}`,
        text: navData.title,
      },
      '.nav-item-link'
    );
  }

  #setPageMetaTitle(data) {
    if (document.title != data.title) {
      document.title = data.title;
    }
  }
}

export default new NavView();
