const fs = require('fs/promises');
const path = require('path');

class FilesApi {
  #rootFolder;

  constructor() {
    this.#rootFolder = 'C:\\atari-monk\\Code\\js-notes-templated\\src\\json';
  }

  async #getAll(req, res) {
    const data = {};
    data.files = await this.#load(res);
    res.status(200).json({
      status: 'success',
      results: data.files.length,
      data,
    });
  }

  registerRoutes(app) {
    app.get('/api/v1/files', this.#getAll.bind(this));
  }

  async #load(res) {
    try {
      return await this.#getFileObjects(await fs.readdir(this.#rootFolder));
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
    for (const [index, dirOrFileName] of dirOrFileNames.entries()) {
      data.push(await this.#getFileObject(index, dirOrFileName));
    }
    return data;
  }

  async #getFileObject(index, dirOrFileName) {
    let obj = {};
    obj.id = index + 1;
    obj.name = dirOrFileName;
    const absPath = path.join(this.#rootFolder, dirOrFileName);
    obj.type = (await fs.stat(absPath)).isDirectory() ? 'directory' : 'file';
    obj.path = absPath;
    return obj;
  }
}

exports.FilesApi = FilesApi;
