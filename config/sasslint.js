'use strict';

var paths = require('./paths');

module.exports = {
  options: {
    formatter: process.env.NODE_ENV === 'development' ? 'checkstyle' : 'stylish'
  },
  configFile: paths.lint.sass
};
