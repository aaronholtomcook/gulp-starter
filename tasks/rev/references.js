'use strict';

var gulp = require('gulp');
var revReplace = require('gulp-rev-replace');
var path = require('path');
var paths = require('../../config/paths');
var config = {
  revReplace: require('../../config/revReplace')
};

function task () {
  return gulp
    .src(path.join(paths.dest.base, '/**/*.{css, js}'))
    .pipe(revReplace(config.revReplace))
    .pipe(gulp.dest(paths.dest.base));
}

gulp.task('rev:references', task);

module.exports = task;
