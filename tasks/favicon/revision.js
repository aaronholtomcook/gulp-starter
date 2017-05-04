'use strict';

const gulp = require('gulp');
const rev = require('gulp-rev');
const revNapkin = require('gulp-rev-napkin');
const {join} = require('path');
const paths = require('../../config/paths');
const errorHandler = require('../../utilities/errorHandler');
const config = {
  rev: require('../../config/rev'),
  revNapkin: require('../../config/revnapkin')
};

gulp.task('favicon:revision:icons', () => gulp
  .src(join(paths.dest.favicons, '**/*.{gif,ico,jpg,jpeg,json,png,svg,xml}'), {
    base: paths.dest.base
  })
  .pipe(errorHandler())
  .pipe(rev())
  .pipe(gulp.dest(paths.dest.base))
  .pipe(revNapkin(config.revNapkin))
  .pipe(rev.manifest(paths.manifests.revision, config.rev))
  .pipe(gulp.dest('')));

gulp.task('favicon:revision:manifests', () => gulp
  .src(join(paths.dest.favicons, '**/*.{json,xml}'), {
    base: paths.dest.base
  })
  .pipe(errorHandler())
  .pipe(rev())
  .pipe(gulp.dest(paths.dest.base))
  .pipe(revNapkin(config.revNapkin))
  .pipe(rev.manifest(paths.manifests.revision, config.rev))
  .pipe(gulp.dest('')));
