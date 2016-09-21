'use strict';

var gulp = require('gulp');
var sequence = require('gulp-sequence');
var settings = require('../../config/settings');

function task (cb) {
// , settings.scripting === 'ts' ? 'ts:lint' : 'js:lint'
  sequence(
    'clean',
    ['copy', 'favicons', 'fonts', 'icons', 'images'],
    'templates',
    ['scss:lint'],
    ['scss', 'scripts'],
    cb
  );
}

gulp.task('build', task);

module.exports = task;
