'use strict';

const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');
const livereload = require('gulp-livereload');
const paths = require('../../config/paths');
const errorHandler = require('../../utilities/errorHandler');

gulp.task('images', () => gulp.src(paths.src.images)
  .pipe(changed(paths.dest.images))
  .pipe(imagemin())
  .on('error', errorHandler)
  .pipe(gulp.dest(paths.dest.images))
  .pipe(livereload()));
