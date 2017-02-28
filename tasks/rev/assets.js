'use strict';

var gulp = require('gulp');
var rev = require('gulp-rev');
var revNapkin = require('gulp-rev-napkin');
var paths = require('../../config/paths');
var config = {
  rev: require('../../config/rev'),
  revNapkin: require('../../config/revNapkin')
};

function task () {
  return gulp
    .src([
      paths.dest.fonts,
      paths.dest.images
    ])
    .pipe(rev())
    .pipe(gulp.dest(paths.dest.base))
    .pipe(revNapkin(config.revNapkin))
    .pipe(rev.manifest(paths.src.templates.manifest, config.rev))
    .pipe(gulp.dest(paths.dest.base));
}

gulp.task('rev:assets', task);

module.exports = task;
