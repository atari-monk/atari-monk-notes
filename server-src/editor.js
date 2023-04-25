class Editor {
  constructor(path) {
    this.path = path;
  }

  getEditRoute() {
    return `/files/selected/edit-${this.name}-data`;
  }

  getSaveRoute() {
    return `/processForm/${this.name}-data`;
  }

  edit(req, res) {
    // TODO: Implement edit logic
  }

  save(req, res) {
    // TODO: Implement save logic
  }
}

exports.Editor = Editor;
