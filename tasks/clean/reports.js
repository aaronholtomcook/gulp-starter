'use strict';

const gulp = require('gulp');
const del = require('del');
const paths = require('../../config/paths');
const {reports} = require('../../utilities/paths');

gulp.task('clean:reports', (cb) => del(reports())
  .then(
    () => cb
  ));
