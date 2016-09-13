'use strict';

var gulp = require('gulp');
var sequence = require('gulp-sequence');
var settings = require('../../config/settings');

function task (cb) {
  sequence(
    'clean',
    ['copy', 'favicons', 'fonts', 'icons', 'images'],
    'templates',
    ['scss:lint', settings.scripting === 'ts' ? 'ts:lint' : 'js:lint'],
    ['scss', '' + settings.scripting === 'ts' ? 'ts' : 'js' + ''],
    cb
  );
}

gulp.task('build', task);

module.exports = task;
