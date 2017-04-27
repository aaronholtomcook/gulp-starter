/* eslint-disable no-console */

'use strict';

const express = require('express');
const compression = require('compression');
const livereload = require('connect-livereload');
const {address} = require('ip');
const morgan = require('morgan');
const chalk = require('chalk');
const underline = require('./underline');
const settings = require('../config/settings');
const paths = require('../config/paths');
const app = require(paths.server.app);
const config = {
  livereload: require('../config/livereload')
};

const colours = new chalk.constructor({
  enabled: true
});

const urls = {
  External: `${address()}:${settings.port}`,
  Local: `localhost:${settings.port}`
};

const line = underline(urls, 3);

const server = express();


if (process.env.NODE_ENV === 'development') {
  server.use(livereload(config.livereload));
} else if (process.env.NODE_ENV === 'production') {
  server.use(compression());
}

server
  .use(morgan('dev'))
  .use(app)
  .set('port', settings.port)
  .listen(settings.port, () => console.log(`
${colours.bold.black('Access URLs:')}
${colours.gray(line)}
   Local: ${colours.magenta(urls.Local)}
External: ${colours.magenta(urls.External)}
${colours.gray(line)}
`));
