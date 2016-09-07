'use strict';

var paths = require('./paths');

// TODO: HTML5 mode
module.exports = {
  server: {
    baseDir: paths.dest.base
  },
  notify: false,
  open: false
};
