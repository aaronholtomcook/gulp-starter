'use strict';

const gulp = require('gulp');
const revReplace = require('gulp-rev-replace');
const {join} = require('path');
const errorHandler = require('../../utilities/errorHandler');
const paths = require('../../config/paths');

gulp.task('templates:references', () => gulp
  .src(join(paths.dest.base, '/**/*.html'))
  .pipe(revReplace({
    manifest: gulp.src(paths.manifests.revision)
  }))
  .on('error', errorHandler)
  .pipe(gulp.dest(paths.dest.base)));
