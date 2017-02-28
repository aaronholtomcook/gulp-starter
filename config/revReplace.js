'use strict';

var gulp = require('gulp');
var paths = require('./paths');

module.exports = {
  manifest: gulp.src(paths.src.templates.manifest)
};
