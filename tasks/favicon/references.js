'use strict';

const gulp = require('gulp');
const revReplace = require('gulp-rev-replace');
const {join} = require('path');
const errorHandler = require('../../utilities/errorHandler');
const paths = require('../../config/paths');

gulp.task('favicons:references', () => gulp
  .src(join(paths.dest.favicons, '**/*.{json,xml}'))
  .pipe(revReplace({
    manifest: gulp.src(paths.manifests.revision)
  }))
  .on('error', errorHandler)
  .pipe(gulp.dest(paths.dest.favicons)));
