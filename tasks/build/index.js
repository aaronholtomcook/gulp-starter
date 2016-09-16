'use strict';

var gulp = require('gulp');
var sequence = require('gulp-sequence');
var settings = require('../../config/settings');

// Hack gulp to get the start task name. We use this to determine if we should build or watch browserify
var _gulpStart = gulp.Gulp.prototype.start;
gulp.Gulp.prototype.start = function (taskName) {
  this.currentStartTaskName = taskName;

  _gulpStart.apply(this, arguments);
};

function task (cb) {
  var scriptTask;

  if (settings.scripting === 'ts') {
    if (this.currentStartTaskName === 'build') {
      scriptTask = 'ts:watch';
    } else {
      scriptTask = 'ts:build';
    }
  } else {
    if (this.currentStartTaskName === 'build') {
      scriptTask = 'js:watch';
    } else {
      scriptTask = 'js:build';
    }
  }

  sequence(
    'clean',
    ['copy', 'favicons', 'fonts', 'icons', 'images'],
    'templates',
    ['scss:lint', settings.scripting === 'ts' ? 'ts:lint' : 'js:lint'],
    ['scss', scriptTask],
    cb
  );
}

gulp.task('build', task);

module.exports = task;
