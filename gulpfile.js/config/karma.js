const paths = require('./paths');
const config = require('../utilities/config');

const defaults = {
  configFile: paths.config.karma
};

module.exports = config(defaults, 'karma');
