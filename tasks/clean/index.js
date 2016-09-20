'use strict';

var gulp = require('gulp');
var del = require('del');
var paths = require('../../config/paths');

function task (cb) {
  del([
    paths.dest.base,
    paths.cache
  ]).then(function () {
    cb();
  });
}

gulp.task('clean', task);

module.exports = task;
