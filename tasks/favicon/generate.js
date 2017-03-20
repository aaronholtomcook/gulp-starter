'use strict';

const gulp = require('gulp');
const favicon = require('@mogusbi/favicon');
const config = {
  favicon: require('../../config/favicon')
};

gulp.task('favicon:generate', (cb) => favicon(config.favicon)
  .then(
    () => cb
  ));
