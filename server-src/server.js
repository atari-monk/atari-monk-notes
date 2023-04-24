const { ExpressConfig } = require('./ExpressConfig');
const { FileDialog } = require('./FileDialog');
const bodyParser = require('body-parser');
const { TopDataEditor } = require('./TopDataEditor');

const expressConfig = new ExpressConfig();
const fileDialog = new FileDialog(
  'C:/atari-monk/Code/js-notes-templated/src/json'
);
const topDataEditor = new TopDataEditor();

expressConfig.app.get('/', fileDialog.handleRequest.bind(fileDialog));
expressConfig.app.get(
  '/files/selected',
  fileDialog.handleSelected.bind(fileDialog)
);
expressConfig.app.get(
  '/files/selected/edit-top-data',
  topDataEditor.edit.bind(topDataEditor)
);
expressConfig.app.post('/processData', topDataEditor.save.bind(topDataEditor));
expressConfig.start(process.env.PORT || 3000);
