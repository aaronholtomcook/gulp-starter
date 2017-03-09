'use strict';

const gulp = require('gulp');
const del = require('del');
const paths = require('../../config/paths');

gulp.task('clean:dist', (cb) => del(paths.dest.base)
  .then(
    () => cb
  ));
