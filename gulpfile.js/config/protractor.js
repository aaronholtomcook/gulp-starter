'use strict';

const paths = require('./paths');
const settings = require('./settings');
const config = require('../utilities/config');

const defaults = {
  args: [
    '--baseUrl',
    `http://127.0.0.1:${settings.port}/`
  ],
  configFile: paths.config.protractor
};

module.exports = config(defaults, 'protractor');
