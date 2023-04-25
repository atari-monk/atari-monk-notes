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

const editors = [
  new TopDataEditor(),
  new NavDataEditor(),
  new SourceDataEditor(),
  new DescriptionDataEditor(),
];

expressConfig.app.get('/', fileDialog.handleRequest.bind(fileDialog));
expressConfig.app.get(
  '/files/selected',
  fileDialog.handleSelected.bind(fileDialog)
);

for (const editor of editors) {
  expressConfig.app.get(editor.getEditRoute(), editor.edit.bind(editor));
  expressConfig.app.post(editor.getSaveRoute(), editor.save.bind(editor));
}

expressConfig.start(process.env.PORT || 3000);
