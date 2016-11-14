'use strict';

var gulp = require('gulp');
var fs = require('fs');
var sasslint = require('gulp-sass-lint');
var paths = require('../../config/paths');
var config = {
  sasslint: require('../../config/sasslint')
};

function task () {
  var file = fs.createWriteStream(paths.reports.sass);

  return gulp
    .src(paths.src.sass)
    .pipe(sasslint(config.sasslint))
    .pipe(sasslint.format(file))
    .on('finish', function () {
      file.end();
    });
}

gulp.task('scss:lint', task);

module.exports = task;
