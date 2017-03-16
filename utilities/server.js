/* eslint-disable no-console */

'use strict';

const express = require('express');
const liveReload = require('connect-livereload');
const paths = require('../config/paths');
const settings = require('../config/settings');

const app = express();

app
  .use(liveReload())
  .use('/', express.static(paths.dest.base))
  .set('port', settings.port)
  .listen(settings.port, () => console.log(`Started on port ${settings.port}`));

module.exports = app;
