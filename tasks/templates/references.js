'use strict';

const gulp = require('gulp');
const gulpIf = require('gulp-if');
const inlinesource = require('gulp-inline-source');
const revReplace = require('gulp-rev-replace');
const {join} = require('path');
const errorHandler = require('../../utilities/errorHandler');
const paths = require('../../config/paths');
const config = {
  inlinesource: require('../../config/inlinesource')
};

gulp.task('templates:references', () => gulp
  .src(join(paths.dest.base, '**/*.html'))
  .pipe(errorHandler())
  .pipe(revReplace({
    manifest: gulp.src(paths.manifests.revision)
  }))
  .pipe(gulpIf(process.env.NODE_ENV === 'production', inlinesource(config.inlinesource)))
  .pipe(gulp.dest(paths.dest.base)));
