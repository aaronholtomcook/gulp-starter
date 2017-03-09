'use strict';

const gulp = require('gulp');
const changed = require('gulp-changed');
const livereload = require('gulp-livereload');
const paths = require('../../config/paths');

gulp.task('copy', () => gulp.src(paths.src.copy)
  .pipe(changed(paths.dest.base))
  .pipe(gulp.dest(paths.dest.base))
  .pipe(livereload()));
