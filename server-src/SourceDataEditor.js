const fs = require('fs').promises;

class SourceDataEditor {
  constructor() {
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
      this.serverData = data;
      res.render('source-data-form', { data });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .send(`Error loading data for ${filePath} : ${err.message}`);
    }
  }

  async save(req, res) {
    const { source } = this.serverData;
    const { new_text, new_link, ...updatedLinks } = req.body;

    // Update existing links
    for (let i = 0; i < source.links.length; i++) {
      const link = source.links[i];
      if (updatedLinks[`link_${i}`] !== undefined) {
        link.text = updatedLinks[`link_${i}`];
      }
      if (updatedLinks[`text_${i}`] !== undefined) {
        link.link = updatedLinks[`text_${i}`];
      }
    }

    // Add new link
    if (new_text && new_link) {
      source.links.push({ link: new_link, text: new_text });
    }

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

exports.SourceDataEditor = SourceDataEditor;
