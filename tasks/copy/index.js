'use strict';

var gulp = require('gulp');
var changed = require('gulp-changed');
var paths = require('../../config/paths');

function task () {
  return gulp
    .src(paths.src.copy)
    .pipe(changed(paths.dest.base))
    .pipe(gulp.dest(paths.dest.base));
}

gulp.task('copy', task);

module.exports = task;
