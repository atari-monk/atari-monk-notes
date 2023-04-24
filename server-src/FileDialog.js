const fs = require('fs').promises;
const path = require('path');

class FileDialog {
  #dirs;
  constructor(root) {
    this.root = root;
    this.#dirs = [];
  }

  // this handles directories
  async handleRequest(req, res) {
    let fileName = req.query.directoryPath;
    if (fileName === undefined) fileName = this.root;
    fileName = fileName.replace(/\\/g, '/');
    this.#dirs.push(fileName);
    try {
      const files = await fs.readdir(fileName);
      const filteredFiles = files.filter((file) => !file.startsWith('.'));
      const filepaths = filteredFiles.map((file) => path.join(fileName, file));
      const types = await Promise.all(
        filepaths.map(async (filepath) => {
          const stats = await fs.stat(filepath);
          return stats.isDirectory() ? 'directory' : 'file';
        })
      );
      res.render('file-dialog', { filepaths, files: filteredFiles, types });
    } catch (err) {
      console.error(`Error reading directory: ${fileName}`);
      res.status(500).send('Error reading directory');
    }
  }

  // this handles files
  async handleSelected(req, res) {
    let fileName = req.query.file;
    if (fileName === undefined) {
      console.log('Error! No file name!');
      res.status(400).send('Error! No file name provided.');
      return;
    }
    const dirName = this.#dirs.pop();
    const filePath = path.join(dirName, fileName);
    console.log('FileDialog -> File name:', fileName);
    console.log('FileDialog -> File path:', filePath);
    res.render('file-menu', { fileName, filePath });
  }
}

exports.FileDialog = FileDialog;
