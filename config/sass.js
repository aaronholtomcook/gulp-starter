'use strict';

var paths = require('./paths');

module.exports = {
  includePaths: [
    paths.src.sass,
    paths.src.packages.node_modules,
    paths.src.packages.bower_components
  ]
};
