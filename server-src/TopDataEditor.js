const fs = require('fs');

class TopDataEditor {
  constructor() {
    this.serverData = null;
    this.serverPath = null;
  }

  edit(req, res) {
    const filePath = req.query.path;
    this.serverPath = filePath;
    fs.readFile(filePath, 'utf8', (err, jsonData) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .send(`Error loading data for ${filePath} : ${err.message}`);
        return;
      }
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
      res.render('top-data-form', { data });
    });
  }

  save(req, res) {
    const { isKey, isScrollToBottom, title } = req.body;
    // do something with the data
    this.serverData.isKey = isKey === 'on' ? 'true' : 'false';
    this.serverData.isScrollToBottom =
      isScrollToBottom === 'on' ? 'true' : 'false';
    this.serverData.title = title;
    const jsonString = JSON.stringify(this.serverData);
    fs.writeFile(this.serverPath, jsonString, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('File has been saved!');
    });
    res.render('summary');
  }
}
exports.TopDataEditor = TopDataEditor;
