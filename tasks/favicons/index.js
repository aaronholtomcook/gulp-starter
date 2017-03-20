'use strict';

const gulp = require('gulp');
const favicons = require('@mogusbi/favicon');
const config = {
  favicons: require('../../config/favicons')
};

gulp.task('favicons', (cb) => favicons(config.favicons)
  .then(
    () => cb
  ));
