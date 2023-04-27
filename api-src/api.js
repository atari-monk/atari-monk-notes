const { ExpressConfig } = require('../express-config');
const { JsonApi } = require('./json');

const expressConfig = new ExpressConfig();

const jsonApi = new JsonApi('./test.json');
jsonApi.registerRoutes(expressConfig.app);

expressConfig.start(process.env.PORT || 3001);
