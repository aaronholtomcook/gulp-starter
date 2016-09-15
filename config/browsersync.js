'use strict';

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
      baseDir: paths.dest.base
    }
  };
}

config.notify = false;
config.open = false;

// TODO: HTML5 mode for static mode
module.exports = config;
