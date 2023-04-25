const fs = require('fs').promises;
const { SelectiveEditor } = require('./selective-editor');

class ContentEditor extends SelectiveEditor {
  constructor() {
    super('C:/atari-monk/Code/js-notes-templated/src/json');
    this.name = 'content';
    this.serverData = null;
    this.serverPath = null;
  }

  async select(req, res) {
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
      this.serverData = dataObj;
      res.render('select-content', { notes: dataObj.note });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .send(`Error loading data for ${filePath} : ${err.message}`);
    }
  }

  async edit(req, res) {
    const selectedTitle = req.body.contentTitle;
    let selectedContent;
    for (let i = 0; i < this.serverData.note.length; i++) {
      if (this.serverData.note[i].type === 'content' && this.serverData.note[i].title === selectedTitle) {
        selectedContent = this.serverData.note[i];
        break;
      }
    }
    res.render('edit-content', { content: selectedContent });
  }

  async save(req, res) {
    const { title, links, newlink, newtitle, newtime } = req.body;

    // Find the selected content object in the data
    const selectedTitle = title;
    let selectedContent;
    for (let i = 0; i < this.serverData.note.length; i++) {
      if (
        this.serverData.note[i].type === 'content' &&
        this.serverData.note[i].title === selectedTitle
      ) {
        selectedContent = this.serverData.note[i];
        break;
      }
    }

    // Update the selected content object with the form data
    selectedContent.title = title;
    selectedContent.links = links.map((link) => ({
      link: link.link,
      title: link.title,
      time: link.time,
    }));
    if (newlink && newtitle && newtime) {
      selectedContent.links.push({
        link: newlink,
        title: newtitle,
        time: newtime,
      });
    }

    // Save the updated data to the file
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

exports.ContentEditor = ContentEditor;
