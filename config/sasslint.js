'use strict';

var paths = require('./paths');

module.exports = {
  options: {
    formatter: process.env.NODE_ENV === 'production' ? 'checkstyle' : 'stylish'
  },
  configFile: paths.lint.sass
};
