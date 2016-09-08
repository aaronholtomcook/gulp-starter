'use strict';

var browserify = require('browserify'),
  buffer = require('vinyl-buffer'),
  errorHandler = require('../../utilities/errorHandler'),
  gulp = require('gulp'),
  gulpIf = require("gulp-if"),
  paths = require('../../config/paths'),
  source = require('vinyl-source-stream'),
  sourcemaps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify');

function task () {
  var b = browserify({
    entries: paths.src.jsEntry,
    debug: process.env.NODE_ENV === 'development'
  });

  return b.bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulpIf(process.env.NODE_ENV === 'development', sourcemaps.init()))
    .pipe(gulpIf(process.env.NODE_ENV === 'production', uglify()))
    .on('error', errorHandler)
    .pipe(gulpIf(process.env.NODE_ENV === 'development', sourcemaps.write()))
    .pipe(gulp.dest(paths.dest.js));
}

gulp.task('scripts', task);
module.exports = task;
