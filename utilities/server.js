/* eslint-disable no-console */

'use strict';

const livereload = require('connect-livereload');
const settings = require('../config/settings');
const paths = require('../config/paths');
const app = require(paths.server.app);

if (process.env.NODE_ENV === 'development') {
  app.use(livereload());
}

app
  .set('port', settings.port)
  .listen(settings.port, () => console.log(`
==========================================
 Development server running on port: ${settings.port}
==========================================
`));
