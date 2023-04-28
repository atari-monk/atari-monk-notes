const fs = require('fs/promises');
const pathLib = require('path');

class FilesApi {
  #rootFolder;

  constructor() {
    this.#rootFolder = 'C:\\atari-monk\\Code\\js-notes-templated\\src\\json';
  }

  async #getRootDirs(req, res) {
    const data = {};
    data.files = await this.#load(res, this.#rootFolder);
    res.status(200).json({
      status: 'success',
      results: data.files.length,
      data,
    });
  }

  async #getDirFiles(req, res) {
    const dirId = req.params.dirId;
    const dir = (await this.#load(res, this.#rootFolder)).find(
      (f) => f.id === Number(dirId)
    );
    const data = {};
    data.files = await this.#load(res, dir.path);
    res.status(200).json({
      status: 'success',
      results: data.files.length,
      data,
    });
  }

  async #getFile(req, res) {
    const dirId = req.params.dirId;
    const fileId = req.params.fileId;
    const dir = (await this.#load(res, this.#rootFolder)).find(
      (f) => f.id === Number(dirId)
    );
    const file = (await this.#load(res, dir.path)).find(
      (f) => f.id === Number(fileId)
    );
    const data = {};
    data.file = file;
    res.status(200).json({
      status: 'success',
      data,
    });
  }

  registerRoutes(app) {
    app.route('/api/v1/files').get(this.#getRootDirs.bind(this));
    app.route('/api/v1/files/:dirId').get(this.#getDirFiles.bind(this));
    app.route('/api/v1/files/:dirId/:fileId').get(this.#getFile.bind(this));
  }

  async #load(res, path) {
    try {
      return await this.#getFileObjects(path, await fs.readdir(path));
    } catch (err) {
      const msg = `Error reading directory: ${path}, msg: ${err.message}`;
      console.error(msg);
      res.status(500).send(msg);
    }
  }

  async #getFileObjects(path, dirOrFileNames) {
    const data = [];
    for (const [index, dirOrFileName] of dirOrFileNames.entries()) {
      data.push(await this.#getFileObject(index, dirOrFileName, path));
    }
    return data;
  }

  async #getFileObject(index, dirOrFileName, path) {
    let obj = {};
    obj.id = index + 1;
    obj.name = dirOrFileName;
    const absPath = pathLib.join(path, dirOrFileName);
    obj.type = (await fs.stat(absPath)).isDirectory() ? 'directory' : 'file';
    obj.path = absPath;
    return obj;
  }
}

exports.FilesApi = FilesApi;
