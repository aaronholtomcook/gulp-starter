/* eslint-disable no-console */

'use strict';

const express = require('express');
const compression = require('compression');
const livereload = require('connect-livereload');
const {address} = require('ip');
const morgan = require('morgan');
const colours = require('colors/safe');
const underline = require('./underline');
const settings = require('../config/settings');
const paths = require('../config/paths');
const app = require(paths.server.app);

const line = underline({
  'Local': `localhost:${settings.port}`,
  'External': `${address()}:${settings.port}`
});

const server = express();


if (process.env.NODE_ENV === 'development') {
  server.use(livereload());
} else if (process.env.NODE_ENV === 'production') {
  server.use(compression());
}

server
  .use(morgan('dev'))
  .use(app)
  .set('port', settings.port)
  .listen(settings.port, () => console.log(`
${colours.bold('Access URLs:')}
${colours.gray(line)}
   Local: ${colours.magenta(`localhost:${settings.port}`)}
External: ${colours.magenta(`${address()}:${settings.port}`)}
${colours.gray(line)}
`));
