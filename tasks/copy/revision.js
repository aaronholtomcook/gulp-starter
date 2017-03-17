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

gulp.task('copy:revision', () => gulp
  .src([
    join(paths.dest.base, '**/*'),
    `!${join(paths.dest.css, '**/*')}`,
    `!${join(paths.dest.fonts, '**/*')}`,
    `!${join(paths.dest.images, '**/*')}`
  ], {
    base: paths.dest.base
  })
  .pipe(rev())
  .pipe(gulp.dest(paths.dest.base))
  .pipe(revNapkin(config.revNapkin))
  .pipe(rev.manifest(paths.manifests.revision, config.rev))
  .on('error', errorHandler)
  .pipe(gulp.dest('')));
