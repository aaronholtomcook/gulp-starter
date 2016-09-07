'use strict';

var gulp = require('gulp');
var sequence = require('gulp-sequence');

function task (cb) {
  sequence('icons', 'styles:lint', 'styles', cb);
}

gulp.task('default', task);

module.exports = task;
