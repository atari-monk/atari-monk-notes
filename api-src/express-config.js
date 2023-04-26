const express = require('express');

class ExpressConfig {
  #app;

  constructor() {
    this.#app = express();
    this.#app.use(express.json());
  }

  get app() {
    return this.#app;
  }

  start(port) {
    this.#app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  }
}

exports.ExpressConfig = ExpressConfig;
