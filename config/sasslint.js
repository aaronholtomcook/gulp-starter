'use strict';

var paths = require('./paths');

module.exports = {
  configFile: paths.lint.sass,
  options: {
    formatter: 'checkstyle',
    'output-file': paths.reports.sass
  }
};
