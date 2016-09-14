'use strict';

var paths = require('./paths');

module.exports = {
  includePaths: [
    paths.src.sass,
    paths.packages.node_modules,
    paths.packages.bower_components
  ]
};
