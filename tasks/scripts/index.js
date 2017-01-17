'use strict';

var gulp = require('gulp');
var sequence = require('gulp-sequence');
var settings = require('../../config/settings');

function task (cb) {
  sequence(
    settings.express ? ['scripts:client', 'scripts:server'] : ['scripts:client'],
    cb
  );
}

gulp.task('scripts', task);

module.exports = task;
