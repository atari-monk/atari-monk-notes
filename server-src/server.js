const { ExpressConfig } = require('./ExpressConfig');
const { FileDialog } = require('./FileDialog');
const bodyParser = require('body-parser');
const { TopDataEditor } = require('./TopDataEditor');
const { NavDataEditor } = require('./NavDataEditor');
const { SourceDataEditor } = require('./SourceDataEditor');
const { DescriptionDataEditor } = require('./DescriptionDataEditor');

const expressConfig = new ExpressConfig();
const fileDialog = new FileDialog(
  'C:/atari-monk/Code/js-notes-templated/src/json'
);
const topDataEditor = new TopDataEditor();
const navDataEditor = new NavDataEditor();
const sourceDataEditor = new SourceDataEditor();
const descriptionDataEditor = new DescriptionDataEditor();

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
expressConfig.app.get(
  '/files/selected/edit-source-data',
  sourceDataEditor.edit.bind(sourceDataEditor)
);
expressConfig.app.post(
  '/processForm/source-data',
  sourceDataEditor.save.bind(sourceDataEditor)
);
expressConfig.app.get(
  '/files/selected/edit-description-data',
  descriptionDataEditor.edit.bind(descriptionDataEditor)
);
expressConfig.app.post(
  '/processForm/description-data',
  descriptionDataEditor.save.bind(descriptionDataEditor)
);
expressConfig.start(process.env.PORT || 3000);
