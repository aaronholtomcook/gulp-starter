'use strict';

const gulp = require('gulp');
const sequence = require('run-sequence');

gulp.task('default', (cb) => sequence(
  'build',
  'watch',
  'server',
  cb
));
