'use strict';

var gulp = require('gulp');
var revReplace = require('gulp-rev-replace');
var paths = require('../../config/paths');
var config = {
  revReplace: require('../../config/revReplace')
};

function task () {
  return gulp
    .src([
      path.join(paths.dest.images, '/**/*'),
      path.join(paths.dest.js, '/**/*')
    ])
    .pipe(revReplace(config.revReplace))
    .pipe(gulp.dest(paths.dest.base));
}

gulp.task('rev:assets', task);

module.exports = task;
