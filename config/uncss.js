'use strict';

var path = require('path');
var paths = require('./paths');

module.exports = {
  html: [path.resolve(paths.dest.base, '**/*.html')],
  ignore: [
    // Makes UnCSS Bootstrap safe
    /\.fade/,
    /\.modal/,
    '.affix',
    /\.tooltip/,
    /\.popover/,
    /\.collaps/,
    /\.carousel-inner/,
    /\.open/,
    /\.in/,
    /\.js/
  ]
};
