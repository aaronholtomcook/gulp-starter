'use strict';

var gulp = require('gulp');
var sasslint = require('gulp-sass-lint');
var fs = require('fs');
var mkdirp = require('mkdirp');
var paths = require('../../config/paths');
var config = {
  sasslint: require('../../config/sasslint')
};

function task () {
  return gulp
    .src(paths.client.src.sass)
    .pipe(sasslint(config.sasslint))
    .pipe(sasslint.format('checkstyle', function (results) {
      mkdirp(paths.reports.sass, function () {
        fs.writeFileSync(paths.reports.sass, results);
      });
    }));
}

gulp.task('styles:lint', task);

module.exports = task;
