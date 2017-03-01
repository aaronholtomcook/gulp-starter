'use strict';

var gulp = require('gulp');
var rev = require('gulp-rev');
var revNapkin = require('gulp-rev-napkin');
var merge = require('merge-stream');
var path = require('path');
var paths = require('../../config/paths');
var config = {
  rev: require('../../config/rev'),
  revNapkin: require('../../config/revNapkin')
};

function task () {
  var css = gulp
    .src(path.join(paths.dest.base, '/**/*.css'))
    .pipe(rev())
    .pipe(gulp.dest(paths.dest.base))
    .pipe(revNapkin(config.revNapkin))
    .pipe(rev.manifest(paths.src.templates.manifest, config.rev))
    .pipe(gulp.dest(''));

  var favicon = gulp
    .src(path.join(paths.dest.favicons, '/**/*.{json, webapp, xml}'))
    .pipe(rev())
    .pipe(gulp.dest(paths.dest.base))
    .pipe(revNapkin(config.revNapkin))
    .pipe(rev.manifest(paths.src.templates.manifest, config.rev))
    .pipe(gulp.dest(''));

  return merge(css, favicon);
}

gulp.task('rev:css', task);

module.exports = task;
