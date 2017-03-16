'use strict';

const gulp = require('gulp');
const sequence = require('gulp-sequence');
const config = {
  build: require('../../config/build')
};

gulp.task('build', (cb) => sequence(
  ...config.build,
  cb
));
