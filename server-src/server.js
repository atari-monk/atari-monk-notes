const { ExpressConfig } = require('./ExpressConfig');
const { FileDialog } = require('./FileDialog');
const fs = require('fs');
const bodyParser = require('body-parser');

const expressConfig = new ExpressConfig();
const fileDialog = new FileDialog(
  'C:/atari-monk/Code/js-notes-templated/src/json'
);

expressConfig.app.get('/', fileDialog.handleRequest.bind(fileDialog));
expressConfig.app.get(
  '/files/selected',
  fileDialog.handleSelected.bind(fileDialog)
);
expressConfig.app.get('/files/selected/edit-top-data', (req, res) => {
  const filePath = req.query.path;
  serverPath = filePath;
  fs.readFile(filePath, 'utf8', (err, jsonData) => {
    if (err) {
      console.error(err);
      res.status(500).send(`Error loading data for ${filePath} : ${err.message}`);
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
    serverData = data;
    res.render('top-data-form', { data });
  });
});
let serverData;
let serverPath;
expressConfig.app.post('/processData', (req, res) => {
  const { isKey, isScrollToBottom, title } = req.body;
  // do something with the data
  serverData.isKey = isKey === 'on' ? 'true' : 'false';
  serverData.isScrollToBottom = isScrollToBottom === 'on' ? 'true' : 'false';
  serverData.title = title;
  const jsonString = JSON.stringify(serverData);
  fs.writeFile(serverPath, jsonString, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('File has been saved!');
  });
  //res.send('Data processed!');
  res.render('summary');
});
expressConfig.start(process.env.PORT || 3000);
