export class View {
  addHandlerRender(handler) {
    ['load'].forEach((ev) => window.addEventListener(ev, handler));
  }

  _getParentElement(templateName, selector) {
    const template = document.getElementById(templateName);
    return template.content.querySelector(selector);
  }

  //todo: change name to cloneNode, and param to element
  _getNewParent(parentElement) {
    return document.importNode(parentElement, true);
  }

  _templateText(element, selector, template, data) {
    const childEl = element.querySelector(selector);
    childEl.textContent = childEl.textContent.replace(
      new RegExp(`{%${template.toUpperCase()}%}`),
      data
    );
  }

  _templateElText(element, template, data) {
    element.textContent = element.textContent.replace(
      new RegExp(`{%${template.toUpperCase()}%}`),
      data
    );
  }

  _templateHtml(element, template, data) {
    element.innerHTML = element.innerHTML.replace(
      new RegExp(`{%${template.toUpperCase()}%}`),
      data
    );
  }

  _templateChildHtml(element, selector, template, data) {
    const childEl = element.querySelector(selector);
    childEl.innerHTML = childEl.innerHTML.replace(
      new RegExp(`{%${template.toUpperCase()}%}`),
      data
    );
  }

  _templateChildHtml2(element, selector, template, data) {
    const childEl = element.querySelector(selector);
    if (data === undefined) {
      childEl.classList.add('hide');
      return;
    }
    childEl.innerHTML = childEl.innerHTML.replace(
      new RegExp(`{%${template.toUpperCase()}%}`),
      data
    );
  }

  _templateLink(element, template, data, selector = 'a') {
    const linkEl = element.querySelector(selector);
    linkEl.setAttribute('href', data.link);
    linkEl.textContent = linkEl.textContent.replace(
      new RegExp(`{%${template.toUpperCase()}%}`),
      data.text
    );
  }

  _templateLink2(element, template, data, selector = 'a') {
    const newElement = this._getNewParent(element);
    const linkEl = newElement.querySelector(selector);
    linkEl.setAttribute('href', data.link);
    linkEl.textContent = linkEl.textContent.replace(
      new RegExp(`{%${template.toUpperCase()}%}`),
      data.text
    );
    return newElement;
  }

  _setAttribute(data, propName, element, attributeName) {
    if (data.hasOwnProperty(propName) === false) return;
    element.setAttribute(attributeName, data[propName]);
  }

  _hideElement(data, propName, element, selector, cssClass) {
    if (data.hasOwnProperty(propName) === false || data[propName] === true)
      return;
    const childEl = element.querySelector(selector);
    childEl.classList.add(cssClass);
  }

  _createBr() {
    return document.createElement('br');
  }

  _scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
    console.log('scrolling to bottom!');
  }

  _centerText(data, element) {
    if (data.hasOwnProperty('isCenter') && data.isCenter) {
      element.classList.add('center-text');
    }
  }

  _injectText(text, inject) {
    return text.replace(
      new RegExp(inject.key, 'g'),
      inject.text
    );
  }
}
