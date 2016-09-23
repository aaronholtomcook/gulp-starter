'use strict';

var gulp = require('gulp');
var changed = require('gulp-changed');
var browsersync = require('browser-sync');
var paths = require('../../config/paths');

function task () {
  return gulp
    .src(paths.src.copy, {
      dot: true
    })
    .pipe(changed(paths.dest.base))
    .pipe(gulp.dest(paths.dest.base))
    .pipe(browsersync.stream());
}

gulp.task('copy', task);

module.exports = task;
