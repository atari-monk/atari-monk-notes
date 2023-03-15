import { View } from './view.js';

export class NavView extends View {
  #navList;

  createContent(data, detectOSCard, styleBtn) {
    const nav = this.#createNav(data);
    this.#navList = nav.querySelector('.nav-ul');
    this.#createNavLinks(data);
    this.#createDetectOsCard(nav, detectOSCard);
    this.#createStyleBtn(styleBtn);
    document.body.appendChild(nav);
  }

  #createNav(data) {
    const nav = this._getParentElement('template-nav', '.nav');
    const newNav = this._getNewParent(nav);
    this._templateText(newNav, '.nav-title', 'title', data.title);
    return newNav;
  }

  #createNavLinks(data) {
    const navLinks = this._filterOne(data.links, 'nav');
    const navItem = this._getParentElement('template-nav-item', '.nav-item');
    navLinks.nav.forEach((navData) => {
      const newNavItem = this._getNewParent(navItem);
      this._templateLink(
        newNavItem,
        'nav_link',
        {
          link: `#${navData.title.toLowerCase()}`,
          text: navData.title,
        },
        '.nav-item-link'
      );
      this.#navList.appendChild(newNavItem);
    });
  }

  #createDetectOsCard(nav, detectOSCard) {
    nav.querySelector('#nav-nav').appendChild(detectOSCard);
  }

  #createStyleBtn(styleBtn) {
    this.#navList.appendChild(styleBtn);
  }
}

export default new NavView();
