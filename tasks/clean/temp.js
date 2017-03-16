'use strict';

const gulp = require('gulp');
const del = require('del');
const paths = require('../../config/paths');

gulp.task('clean:temp', (cb) => del(paths.temp)
  .then(
    () => cb
  ));
