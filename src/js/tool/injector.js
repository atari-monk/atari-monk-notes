export class Injector {
  inject(text, inject) {
    if (inject === undefined) return text;
    inject.forEach((item) => {
      if (text.includes(item.key)) text = this.#inject(text, item);
    });
    return text;
  }

  #inject(text, inject) {
    return text.replace(new RegExp(inject.key, 'g'), inject.text);
  }
}
