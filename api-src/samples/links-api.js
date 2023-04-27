class LinksApi {
  constructor() {
    this.links = [];
  }

  getAll(req, res) {
    res.json(this.links);
  }

  getOne(req, res) {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < this.links.length) {
      res.json(this.links[index]);
    } else {
      res.status(404).json({ message: 'Link not found' });
    }
  }

  create(req, res) {
    const newLink = req.body;
    this.links.push(newLink);
    res.status(201).json(newLink);
  }

  update(req, res) {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < this.links.length) {
      this.links[index] = req.body;
      res.json(this.links[index]);
    } else {
      res.status(404).json({ message: 'Link not found' });
    }
  }

  delete(req, res) {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < this.links.length) {
      const deletedLink = this.links.splice(index, 1);
      res.json(deletedLink[0]);
    } else {
      res.status(404).json({ message: 'Link not found' });
    }
  }

  getSelectRoute() {
    return '/links';
  }

  getSelectOneRoute() {
    return '/links/:index';
  }

  registerRoutes(expressApp) {
    expressApp.get(this.getSelectRoute(), this.getAll.bind(this));
    expressApp.get(this.getSelectOneRoute(), this.getOne.bind(this));
    expressApp.post(this.getSelectRoute(), this.create.bind(this));
    expressApp.put(this.getSelectOneRoute(), this.update.bind(this));
    expressApp.delete(this.getSelectOneRoute(), this.delete.bind(this));
  }
}

exports.LinksApi = LinksApi;
