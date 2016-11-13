'use strict';

var history = require('connect-history-api-fallback');
var proxy = require('http-proxy-middleware');
var paths = require('./paths');
var settings = require('./settings');

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

module.exports = {
  server: {
    baseDir: paths.dest.base,
    middleware: middleware
  },
  notify: false,
  open: false,
  port: 3000
};
