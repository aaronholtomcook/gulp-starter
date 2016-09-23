'use strict';

var gulp = require('gulp');
var sasslint = require('gulp-sass-lint');
var paths = require('../../config/paths');
var config = {
  sasslint: require('../../config/sasslint')
};

// TODO: Output checkstyle reports
function task () {
  return gulp
    .src(paths.src.sass)
    .pipe(sasslint(config.sasslint))
    .pipe(sasslint.format());
}

gulp.task('scss:lint', task);

module.exports = task;
