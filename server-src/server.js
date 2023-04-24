const { ExpressConfig } = require('./ExpressConfig');
const { FileDialog } = require('./FileDialog');
const bodyParser = require('body-parser');
const { TopDataEditor } = require('./TopDataEditor');
const { NavDataEditor } = require('./NavDataEditor');

const expressConfig = new ExpressConfig();
const fileDialog = new FileDialog(
  'C:/atari-monk/Code/js-notes-templated/src/json'
);
const topDataEditor = new TopDataEditor();
const navDataEditor = new NavDataEditor();

expressConfig.app.get('/', fileDialog.handleRequest.bind(fileDialog));
expressConfig.app.get(
  '/files/selected',
  fileDialog.handleSelected.bind(fileDialog)
);
expressConfig.app.get(
  '/files/selected/edit-top-data',
  topDataEditor.edit.bind(topDataEditor)
);
expressConfig.app.post(
  '/processForm/top-data',
  topDataEditor.save.bind(topDataEditor)
);
expressConfig.app.get(
  '/files/selected/edit-nav-data',
  navDataEditor.edit.bind(navDataEditor)
);
expressConfig.app.post(
  '/processForm/nav-data',
  navDataEditor.save.bind(navDataEditor)
);
expressConfig.start(process.env.PORT || 3000);
