'use strict';

var paths = require('./paths');

module.exports = {
  options: {
    configFile: paths.lint.sass,
    formatter: 'checkstyle'
  }
};
