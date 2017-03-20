'use strict';

const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const {join} = require('path');
const paths = require('../../config/paths');
const errorHandler = require('../../utilities/errorHandler');

gulp.task('favicon', ['favicon:generate'], () => gulp
  .src(join(paths.dest.favicons, '**/*.{gif,jpg,jpeg,png,svg}'))
  .pipe(imagemin())
  .on('error', errorHandler)
  .pipe(gulp.dest(paths.dest.favicons)));
