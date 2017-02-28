'use strict';

var gulp = require('gulp');
var sequence = require('gulp-sequence');
var settings = require('../../config/settings');

function doRev () {
  if (process.env.NODE_ENV === 'production') {
    return 'rev';
  }
}

function task (cb) {
  sequence(
    'clean',
    ['copy', 'favicons', 'fonts', 'icons', 'images'],
    'templates',
    ['scss:lint', settings.scripting === 'ts' ? 'scripts:tslint' : 'scripts:eslint'],
    ['scss', 'scripts'],
    doRev(),
    cb
  );
}

gulp.task('build', task);

module.exports = task;
