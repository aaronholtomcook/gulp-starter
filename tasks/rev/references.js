'use strict';

var gulp = require('gulp');
var revReplace = require('gulp-rev-replace');
var paths = require('../../config/paths');
var config = {
  revReplace: require('../../config/revReplace')
};

function task () {
  return gulp
    .src(paths.dest.css)
    .pipe(revReplace(config.revReplace))
    .pipe(gulp.dest(paths.dest.css));
}

gulp.task('rev:references', task);

module.exports = task;
