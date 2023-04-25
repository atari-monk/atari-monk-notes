const { Editor } = require('./editor');

class SelectiveEditor extends Editor {
  constructor(path) {
    super(path);
  }

  getSelectRoute() {
    return `/files/selected/select-${this.name}-data`;
  }

  select(req, res) {
  }
}

exports.SelectiveEditor = SelectiveEditor;
