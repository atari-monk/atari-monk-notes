const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

class ExpressConfig {
  constructor() {
    this.app = express();
    this.app.use(express.static('public'));
    //this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.set('views', path.join(__dirname, 'views'));
    this.app.set('view engine', 'ejs');
  }

  get app() {
    return this._app;
  }

  set app(value) {
    this._app = value;
  }

  start(port) {
    this.app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  }
}
exports.ExpressConfig = ExpressConfig;
