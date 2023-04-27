const { ExpressConfig } = require('./express-config');
const { FilesApi } = require('./files-api');

const expressConfig = new ExpressConfig();

const filesApi = new FilesApi();
filesApi.registerRoutes(expressConfig.app);

expressConfig.start(process.env.PORT || 3001);
