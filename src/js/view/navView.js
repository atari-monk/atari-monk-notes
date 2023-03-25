import { View } from './view.js';

export class NavView extends View {
  #navList;

  createContent(data, detectOSCard, styleBtn) {
    const nav = this.#createNav();
    this.#navList = nav.querySelector('.nav-ul');
    this.#createNavLinks(data);
    this.#createDetectOsCard(nav, detectOSCard);
    this.#createStyleBtn(styleBtn);
    document.body.appendChild(this.#createTitle(data));
    document.body.appendChild(nav);
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
      if (
        navData.hasOwnProperty('isPageLink') === false ||
        navData?.isPageLink === true
      ) {
        this._templateLink(
          newNavItem,
          'nav_link',
          {
            link: `#${navData.title.toLowerCase()}`,
            text: navData.title,
          },
          '.nav-item-link'
        );
      } else {
        this._templateLink(
          newNavItem,
          'nav_link',
          {
            link: navData.link,
            text: navData.title,
          },
          '.nav-item-link'
        );
        console.log('newNavItem:', newNavItem);
      }
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
