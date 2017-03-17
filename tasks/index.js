'use strict';

const gulp = require('gulp');
const sequence = require('gulp-sequence');

gulp.task('default', (cb) => sequence(
  'build',
  'watch',
  'server',
  cb
));
