const fs = require('fs').promises;

class NavDataEditor {
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
      res.render('nav-data-form', { data });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .send(`Error loading data for ${filePath} : ${err.message}`);
    }
  }

  async save(req, res) {
    const { nav } = this.serverData;
    const {
      new_title,
      new_link,
      ...updatedLinks
    } = req.body;

    // Update existing links
    for (const i in nav) {
      const linkData = updatedLinks[`link_${i}`];
      if (linkData) {
        nav[i].title = updatedLinks[`title_${i}`];
        nav[i].link = linkData;
      }
    }

    // Add new link
    if (new_title && new_link) {
      nav.push({ title: new_title, link: new_link });
    } else if (new_title && new_link == false) {
      nav.push({ title: new_title });
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

exports.NavDataEditor = NavDataEditor;
