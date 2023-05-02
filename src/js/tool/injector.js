export class Injector {
  #injectionsData;

  constructor(injectionsData) {
    this.#injectionsData = injectionsData;
  }

  inject(text) {
    if (this.#injectionsData === undefined) return text;
    this.#injectionsData.injections.forEach((injectItem) => {
      if (text.includes(injectItem.key)) text = this.#inject(text, injectItem);
    });
    return text;
  }

  #inject(text, injectItem) {
    return text.replace(new RegExp(injectItem.key, 'g'), injectItem.text);
  }
}
