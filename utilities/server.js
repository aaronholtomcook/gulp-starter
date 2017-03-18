/* eslint-disable no-console */

'use strict';

const express = require('express');
const livereload = require('connect-livereload');
const settings = require('../config/settings');
const paths = require('../config/paths');
const app = require(paths.server.app);

const server = express();

if (process.env.NODE_ENV === 'development') {
  server.use(livereload());
}

server
  .use(app)
  .set('port', settings.port)
  .listen(settings.port, () => console.log(`
==========================================
 Development server running on port: ${settings.port}
==========================================
`));
