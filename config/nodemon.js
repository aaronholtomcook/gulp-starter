'use strict';

var path = require('path');
var paths = require('./paths');

module.exports = {
  script: path.join(paths.dest.server, 'www'),
  watch: [
    path.join(paths.dest.server, 'www')
  ],
  env: {
    NODE_ENV: process.env.NODE_ENV
  }
};
