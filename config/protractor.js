'use strict';

var paths = require('./paths');
var browsersync = require('./browsersync');

module.exports = {
  configFile: paths.config.protractor,
  args: [
    '--baseUrl',
    'http://127.0.0.1:' + browsersync.port + '/'
  ]
};
