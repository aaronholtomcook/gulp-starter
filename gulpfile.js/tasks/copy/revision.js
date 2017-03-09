'use strict';

const gulp = require('gulp');
const rev = require('gulp-rev');
const revNapkin = require('gulp-rev-napkin');
const {join} = require('path');
const paths = require('../../config/paths');
const config = {
  revNapkin: require('../../config/revNapkin')
};

gulp.task('copy:revision', () => gulp.src(
  join(paths.dest.base, '**/*'),
  {
    base: paths.dest.base
  })
  .pipe(rev())
  .pipe(gulp.dest(paths.dest.base))
  .pipe(revNapkin(config.revNapkin))
  .pipe(rev.manifest(paths.revisions))
  .pipe(gulp.dest('')));
