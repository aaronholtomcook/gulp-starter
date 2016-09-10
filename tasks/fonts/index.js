'use strict';

var gulp = require('gulp');
var changed = require('gulp-changed');
var browsersync = require('browser-sync');
var paths = require('../../config/paths');

function task () {
  return gulp
    .src(paths.src.fonts)
    .pipe(changed(paths.dest.fonts))
    .pipe(gulp.dest(paths.dest.fonts))
    .on('end', browsersync.reload);
}

gulp.task('fonts', task);

module.exports = task;
