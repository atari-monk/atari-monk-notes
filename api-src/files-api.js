const fs = require('fs/promises');
const path = require('path');

class FilesApi {
  #rootFolder;

  constructor() {
    this.#rootFolder = 'C:\\atari-monk\\Code\\js-notes-templated\\src\\json';
  }

  async #getAll(req, res) {
    const files = await this.#load(res);
    res.status(200).json({
      status: 'success',
      data: {
        files,
      },
    });
  }

  registerRoutes(app) {
    app.get('/api/v1/files', this.#getAll.bind(this));
  }

  async #load(res) {
    try {
      const dirOrFileNames = await fs.readdir(this.#rootFolder);
      const data = await this.#getFileObjects(dirOrFileNames);
      return data;
    } catch (err) {
      const msg = `Error reading directory: ${this.#rootFolder}, msg: ${
        err.message
      }`;
      console.error(msg);
      res.status(500).send(msg);
    }
  }

  async #getFileObjects(dirOrFileNames) {
    const data = [];
    for (const dirOrFileName of dirOrFileNames) {
      await this.#getFileObject(dirOrFileName, data);
    }
    return data;
  }

  async #getFileObject(dirOrFileName, data) {
    let item = {};
    item.name = dirOrFileName;
    const absolutePath = path.join(this.#rootFolder, dirOrFileName);
    const stats = await fs.stat(absolutePath);
    item.type = stats.isDirectory() ? 'directory' : 'file';
    item.path = absolutePath;
    data.push(item);
  }
}

exports.FilesApi = FilesApi;
