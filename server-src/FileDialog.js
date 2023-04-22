const fs = require('fs');
const path = require('path');

class FileDialog {
  constructor(root) {
    this.root = root;
  }

  handleRequest(req, res) {
    let fileName = req.query.directoryPath;
    if (fileName === undefined) fileName = this.root;
    fileName = fileName.replace(/\\/g, '/');
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

  handleSelected(req, res) {
    let fileName = req.query.file;
    if (fileName === undefined) {
      console.log('Error! No file name!');
      res.status(400).send('Error! No file name provided.');
      return;
    }
    console.log('File path:', path.join(this.root, fileName));
    res.send(`File path: ${path.join(this.root, fileName)}`);
  }
}
exports.FileDialog = FileDialog;
