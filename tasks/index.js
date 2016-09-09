'use strict';

var gulp = require('gulp');
var sequence = require('gulp-sequence');

function task (cb) {
  sequence(['images', 'icons', 'templates'], ['scss:lint', 'js:lint'], ['scss', 'js'], 'server', cb);
}

gulp.task('default', task);

module.exports = task;
