'use strict';

var gulp = require('gulp');
var sequence = require('gulp-sequence');

function task (cb) {
  sequence(['images', 'icons', 'templates'], 'styles:lint', 'styles', 'server', cb);
}

gulp.task('default', task);

module.exports = task;
