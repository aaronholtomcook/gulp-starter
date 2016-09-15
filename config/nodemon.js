'use strict';

var paths = require('./paths');

module.exports = {
  script: paths.dest.server.entry,
  watch: [
    paths.dest.server.root
  ],
  env: {
    NODE_ENV: process.env.NODE_ENV
  }
};
