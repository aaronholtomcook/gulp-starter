'use strict';

var history = require('connect-history-api-fallback');
var paths = require('./paths');
var settings = require('./settings');

var config;

if (settings.proxy) {
  config = {
    proxy: settings.proxy
  };
} else {
  config = {
    server: {
      baseDir: paths.dest.base,
      middleware: [settings.angular1 || settings.angular2 ? history() : null]
    }
  };
}

config.notify = false;
config.open = false;

module.exports = config;

