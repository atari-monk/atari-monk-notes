const fs = require('fs').promises;
const editor = require('./editor');

class PreconditionsDataEditor extends editor.Editor {
  constructor() {
    super('C:/atari-monk/Code/js-notes-templated/src/json');
    this.name = 'preconditions';
    this.serverData = null;
    this.serverPath = null;
  }

  async edit(req, res) {
    const filePath = req.query.path;
    this.serverPath = filePath;
    try {
      const jsonData = await fs.readFile(filePath, 'utf8');
      let dataObj;
      try {
        dataObj = JSON.parse(jsonData);
      } catch (err) {
        console.error(err);
        res.status(500).send('Error parsing data');
        return;
      }
      const precondition = dataObj.precondition;
      this.serverData = dataObj;
      res.render('preconditions-form', { precondition });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .send(`Error loading data for ${filePath} : ${err.message}`);
    }
  }

  async save(req, res) {
    const { list } = req.body;
    // Get the list field from the request body

    if (!Array.isArray(list)) {
      res.status(400).send('Invalid list data');
      return;
    }
    // Ensure that the list data is an array

    this.serverData.precondition.list = list.filter(
      (item) => typeof item === 'string'
    );
    // Update the list field in the serverData object with the filtered list data

    const jsonString = JSON.stringify(this.serverData);
    try {
      await fs.writeFile(this.serverPath, jsonString);
      console.log('File has been saved!');
      res.render('summary');
    } catch (err) {
      console.error(err);
      res.status(500).send(`Error saving data: ${err.message}`);
    }
  }
}

exports.PreconditionsDataEditor = PreconditionsDataEditor;
