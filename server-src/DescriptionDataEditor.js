const fs = require('fs').promises;
const editor = require('./editor');

class DescriptionDataEditor extends editor.Editor {
  constructor() {
    super('C:/atari-monk/Code/js-notes-templated/src/json');
    this.name = 'description';
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
      const data = dataObj;
      this.serverData = dataObj;
      res.render('description-data-form', { data });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .send(`Error loading data for ${filePath} : ${err.message}`);
    }
  }

  async save(req, res) {
    const { description: descriptionFromFile } = this.serverData;
    const { isCenter, description: description } = req.body;

    // Parse the description value based on whether it's an array or a string
    let descriptionValue;
    if (Array.isArray(description)) {
      descriptionValue = description.filter(Boolean);
    } else {
      descriptionValue = [description];
    }

    // Update the server data with the new values
    if (isCenter === undefined) descriptionFromFile.isCenter = false;
    else descriptionFromFile.isCenter = isCenter === 'on' ? 'true' : 'false';
    descriptionFromFile.description = descriptionValue;

    const jsonString = JSON.stringify(this.serverData);
    try {
      await fs.writeFile(this.serverPath, jsonString);
      console.log('File has been saved!');
    } catch (err) {
      console.error(err);
    }

    res.render('summary');
  }
}

exports.DescriptionDataEditor = DescriptionDataEditor;
