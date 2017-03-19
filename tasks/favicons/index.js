'use strict';

const gulp = require('gulp');
const favicons = require('../../utilities/favicons');
const config = {
  favicons: require('../../config/favicons')
};

gulp.task('favicons', (cb) => favicons(config.favicons)
  .then(
    () => cb
  ));
