const paths = require('./paths');
const settings = require('./settings');
const config = require('../utilities/config');

const defaults = {
  configFile: paths.config.protractor,
  args: [
    '--baseUrl',
    `http://127.0.0.1:${settings.port}/`
  ]
};

module.exports = config(defaults, 'protractor');
