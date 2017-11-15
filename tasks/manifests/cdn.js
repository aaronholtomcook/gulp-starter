'use strict';

const gulp = require('gulp');
const paths = require('../../config/paths');
const cdnManifest = require('../../plugins/gulpCdnManifest');

gulp.task('manifests:cdn', () => gulp
  .src(paths.manifests.revision)
  .pipe(cdnManifest())
  .pipe(gulp.dest(paths.temp)));
