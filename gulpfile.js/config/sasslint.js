'use strict';

const paths = require('./paths');
const config = require('../utilities/config');

const defaults = {
  configFile: paths.lint.sass,
  options: {
    formatter: process.env.NODE_ENV === 'production' ? 'checkstyle' : 'stylish'
  }
};

module.exports = config(defaults, 'sasslint');
