'use strict';

var gulp = require('gulp');
var sequence = require('gulp-sequence');
var settings = require('../config/settings');

function task (cb) {
  sequence(
    'clean',
    ['images', 'icons', 'templates'],
    ['scss:lint', settings.scripting === 'ts' ? 'ts:lint' : 'js:lint'],
    ['scss', '' + settings.scripting === 'ts' ? 'ts' : 'js' + ''],
    'watch',
    'server',
    cb
  );
}

gulp.task('default', task);

module.exports = task;
