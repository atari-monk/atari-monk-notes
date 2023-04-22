const fs = require('fs');
const path = require('path');

class FileDialog {
  #dirs;
  constructor(root) {
    this.root = root;
    this.#dirs = [];
  }

  //this handles directories
  handleRequest(req, res) {
    let fileName = req.query.directoryPath;
    if (fileName === undefined) fileName = this.root;
    //fileName = fileName.replace(/\\/g, '/');
    this.#dirs.push(fileName);
    fs.readdir(fileName, (err, files) => {
      if (err) {
        console.error(`Error reading directory: ${fileName}`);
        res.status(500).send('Error reading directory');
        return;
      }

      files = files.filter((file) => !file.startsWith('.'));
      const filepaths = files.map((file) => path.join(fileName, file));
      const types = filepaths.map((filepath) => {
        return fs.statSync(filepath).isDirectory() ? 'directory' : 'file';
      });
      res.render('file-dialog', { filepaths, files, types });
    });
  }

  //this handles files
  handleSelected(req, res) {
    let fileName = req.query.file;
    if (fileName === undefined) {
      console.log('Error! No file name!');
      res.status(400).send('Error! No file name provided.');
      return;
    }
    const filePath = path.join(this.#dirs.pop(), fileName);
    console.log('FileDialog -> File name:', fileName);
    console.log('FileDialog -> File path:', filePath);
    res.render('file-menu', { fileName, filePath });
  }
}
exports.FileDialog = FileDialog;
