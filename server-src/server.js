const { ExpressConfig } = require('./ExpressConfig');
const { FileDialog } = require('./FileDialog');

const expressConfig = new ExpressConfig();
const fileDialog = new FileDialog(
  'C:/atari-monk/Code/js-notes-templated/src/json'
);

expressConfig.app.get('/files', fileDialog.handleRequest.bind(fileDialog));
expressConfig.app.get(
  '/files/selected',
  fileDialog.handleSelected.bind(fileDialog)
);
expressConfig.start(process.env.PORT || 3000);
