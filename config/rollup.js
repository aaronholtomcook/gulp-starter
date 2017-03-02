'use strict';

var nodeResolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var uglify = require('rollup-plugin-uglify');
var multiEntry = require('rollup-plugin-multi-entry');
var path = require('path');
var paths = require('./paths');

module.exports = {
  entry: path.join(paths.dest.js, '**/*.js'),
  sourceMap: false,
  format: 'iife',
  onwarn: function (warning) {
    // Skip certain warnings

    // should intercept ... but doesn't in some rollup versions
    if (warning.code === 'THIS_IS_UNDEFINED') {
      return;
    }

    // intercepts in some rollup versions
    if (warning.indexOf('The \'this\' keyword is equivalent to \'undefined\'') > -1) {
      return;
    }

    // console.warn everything else
    console.warn(warning.message);
  },
  plugins: [
    multiEntry(),
    nodeResolve({
      jsnext: true,
      module: true
    }),
    commonjs({
      include: 'node_modules/rxjs/**'
    }),
    uglify()
  ]
};
