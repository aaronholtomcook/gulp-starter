'use strict';

const gulp = require('gulp');
const sequence = require('gulp-sequence');

gulp.task('default', (cb) => sequence(
  'build',
  'server',
  cb
));
