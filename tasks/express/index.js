'use strict';

var gulp = require('gulp');
var changed = require('gulp-changed');
var paths = require('../../config/paths');

function task () {
  return gulp
    .src(paths.src.server.dir)
    .pipe(changed(paths.dest.server))
    .pipe(gulp.dest(paths.dest.server));
}

gulp.task('express', task);

module.exports = task;
