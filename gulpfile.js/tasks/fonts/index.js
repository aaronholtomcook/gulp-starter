'use strict';

const gulp = require('gulp');
const changed = require('gulp-changed');
const livereload = require('gulp-livereload');
const paths = require('../../config/paths');

gulp.task('fonts', () => gulp
  .src(paths.src.fonts)
  .pipe(changed(paths.dest.fonts))
  .pipe(gulp.dest(paths.dest.fonts))
  .pipe(livereload()));
