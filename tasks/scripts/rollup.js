'use strict';

var gulp = require('gulp');
var rollup = require('gulp-rollup');
var path = require('path');
var paths = require('../../config/paths');
var config = {
  rollup: require('../../config/rollup')
};

function task () {
  return gulp
    .src(path.join(paths.dest.js, '**/*.js'))
    .pipe(rollup(config.rollup))
    .pipe(gulp.dest(paths.dest.js));
}

gulp.task('scripts:rollup', task);

module.exports = task;
