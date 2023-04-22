const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Serve the static files (HTML, CSS, JS, etc.)
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const root = 'C:/atari-monk/Code/js-notes-templated/src/json';
// Define the route to handle the file dialog request
app.get('/files', (req, res) => {
  // Get the directory path to read from the query parameter
  let fileName = req.query.directoryPath;
  if (fileName === undefined)
    fileName = root;
  // Replace backslashes with forward slashes
  fileName = fileName.replace(/\\/g, '/');

    // Read the contents of the directory
    fs.readdir(fileName, (err, files) => {
      if (err) {
        console.error(`Error reading directory: ${fileName}`);
        res.status(500).send('Error reading directory');
        return;
      }

      // Filter out hidden files (starting with '.')
      files = files.filter((file) => !file.startsWith('.'));

      // Get the full paths of the files and directories
      const filepaths = files.map((file) => path.join(fileName, file));

      // Get the types (file or directory) of the files and directories
      const types = filepaths.map((filepath) => {
        return fs.statSync(filepath).isDirectory() ? 'directory' : 'file';
      });

      // Render the file dialog page with the list of files and directories
      res.render('file-dialog', { filepaths, files, types });
    });
});

app.get('/files/selected', (req, res) => {
  let fileName = req.query.file;
  if (fileName === undefined) {
    console.log('Error! No file name!');
    res.status(400).send('Error! No file name provided.');
    return;
  }
  console.log('File path:', path.join(root, fileName));
  res.send(`File path: ${path.join(root, fileName)}`);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
