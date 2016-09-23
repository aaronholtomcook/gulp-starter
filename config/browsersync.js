'use strict';

var history = require('connect-history-api-fallback');
var paths = require('./paths');
var settings = require('./settings');

module.exports = {
  server: {
    baseDir: paths.dest.base,
    middleware: [settings.angular1 || settings.angular2 ? history() : null]
  },
  notify: false,
  open: false
};
