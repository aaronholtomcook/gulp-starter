'use strict';

var gulp = require('gulp');
var sequence = require('gulp-sequence');
var settings = require('../../config/settings');

function task (cb) {
  sequence(
    'clean',
    ['copy', 'favicons', 'fonts', 'icons', 'images'],
    'templates',
    ['scss:lint', settings.scripting === 'ts' ? 'scripts:tslint' : 'scripts:eslint'],
    ['scss', 'scripts'],
    process.env.NODE_ENV === 'production' ? 'rev' : false,
    cb
  );
}

gulp.task('build', task);

module.exports = task;
