import { HOME } from '../config.js';
import { View } from './view.js';
import detectOsView from '../view/detectOsView.js';

export class NavView extends View {
  #navList;

  createContent(data) {
    const nav = this.#createNav();
    this.#navList = nav.querySelector('.nav-ul');
    this.#createNavLinks(data);
    document.body.appendChild(this.#createTitle(data));
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

  #createNavLinks(data) {
    data.nav.forEach((navData) => {
      const newNavItem = this._getNewParent(
        this._getParentElement('template-nav-item', '.nav-item')
      );
      if (this.#isNotSectionLink(navData)) {
        if (this.#isHomeLink(navData))
          this.#createHomePageLink(newNavItem, navData);
        else this.#createOtherPageLink(newNavItem, navData);
      } else {
        this.#createPageSectionLink(newNavItem, navData);
      }
      this.#navList.appendChild(newNavItem);
    });
  }

  #isNotSectionLink(navData) {
    return navData.hasOwnProperty('link') === true;
  }

  #isHomeLink(navData) {
    return navData.link === 'home';
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

  #createOtherPageLink(newNavItem, navData) {
    this._templateLink(
      newNavItem,
      'nav_link',
      {
        link: navData.link,
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
}

export default new NavView();
