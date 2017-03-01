'use strict';

var gulp = require('gulp');
var rev = require('gulp-rev');
var revNapkin = require('gulp-rev-napkin');
var path = require('path');
var paths = require('../../config/paths');
var config = {
  rev: require('../../config/rev'),
  revNapkin: require('../../config/revNapkin')
};

function task () {
  return gulp
    .src([
      path.join(paths.dest.css, '/**/*.css'),
      path.join(paths.dest.favicons, '/**/*.{json,webapp,xml}')
    ], {
      base: paths.dest.base
    })
    .pipe(rev())
    .pipe(gulp.dest(paths.dest.base))
    .pipe(revNapkin(config.revNapkin))
    .pipe(rev.manifest(paths.src.templates.manifest, config.rev))
    .pipe(gulp.dest(''));
}

gulp.task('rev:update', task);

module.exports = task;
