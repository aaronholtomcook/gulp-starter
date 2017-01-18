'use strict';

var history = require('connect-history-api-fallback');
var proxy = require('http-proxy-middleware');
var paths = require('./paths');
var settings = require('./settings');


var config;

if (settings.express) {
  config = {
    proxy: settings.proxy
  };
} else {
  var middleware = [];

  if (settings.angular1 || settings.angular2) {
    middleware.push(history({
      rewrites: [{
        from: /^(?!\/assets\/)/i,
        to: '/index.html'
      }]
    }));
  }

  if (settings.proxy) {
    for (var endpoint in settings.proxy) {
      if (settings.proxy.hasOwnProperty(endpoint)) {
        middleware.push(proxy(endpoint, {
          target: settings.proxy[endpoint],
          secure: false
        }));
      }
    }
  }

  config = {
    server: {
      baseDir: paths.dest.base,
      middleware: middleware
    }
  };
}

config.notify = false;
config.open = false;
config.port = 3000;

module.exports = config;
