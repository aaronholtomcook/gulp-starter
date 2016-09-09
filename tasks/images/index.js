'use strict';

var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');
var browsersync = require('browser-sync');
var paths = require('../../config/paths');
var errorHandler = require('../../utilities/errorHandler');

function task () {
  return gulp
    .src(paths.src.images)
    .pipe(changed(paths.dest.images))
    .pipe(imagemin())
    .on('error', errorHandler)
    .pipe(gulp.dest(paths.dest.images))
    .pipe(browsersync.stream());
}

gulp.task('images', task);

module.exports = task;
