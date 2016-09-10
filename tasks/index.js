'use strict';

var gulp = require('gulp');
var sequence = require('gulp-sequence');

function task (cb) {
  sequence(
    'build',
    'watch',
    'server',
    cb
  );
}

gulp.task('default', task);

module.exports = task;
