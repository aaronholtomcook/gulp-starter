'use strict';

var path = require('path');
var _ = require('lodash');
var config = require(path.resolve('./gulp.config.js')).settings;

var defaults = {
  angular1: false,
  angular2: false,
  htmlmin: false,
  proxy: 'localhost:3005',
  scripting: 'js', // Set as "js" for JavaScript, "es6" for ES6 and "ts" for TypeScript
  templates: true,
  uncss: false
};

module.exports = _.defaultsDeep(config, defaults);
