'use strict';

var path = require('path');
var _ = require('lodash');
var config = require(path.resolve('./gulp.config.js')).settings;

var defaults = {
  angular1: false,
  angular2: false,
  express: false, // Leave as false if no Express server is present, "js" for JavaScript and "ts" for TypeScript
  htmlmin: false,
  proxy: false,
  scripting: 'js', // Set as "js" for JavaScript, "es6" for ES6 and "ts" for TypeScript
  uncss: false
};

module.exports = _.defaultsDeep(config, defaults);
