import { CONNECTION } from './config.js';

class Model {
  async getPageData(fileName) {
    return await this.#loadJson(fileName);
  }

  async getInjectionsData() {
    return await this.#loadJson('dictionary/injections');
  }

  async #loadJson(fileName) {
    return await fetch(`${CONNECTION}${fileName}.json`).then((res) =>
      res.json()
    );
  }
}

export default new Model();
