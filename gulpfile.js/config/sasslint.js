const paths = require('./paths');
const config = require('../utilities/config');

const defaults = {
  options: {
    formatter: process.env.NODE_ENV === 'production' ? 'checkstyle' : 'stylish'
  },
  configFile: paths.lint.sass
};

module.exports = config(defaults, 'sasslint');
