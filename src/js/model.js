import { CONNECTION } from './config.js';

class Model {
  async getPageData(fileName) {
    return await this.#loadJson(fileName);
  }

  async #loadJson(fileName) {
    return await fetch(`${CONNECTION}${fileName}.json`).then((res) => res.json());
  }
}

export default new Model();
