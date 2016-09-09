'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');
var paths = require('../../config/paths');

function task () {
  return gulp.src(paths.src.js.scripts)
    .pipe(eslint(paths.lint.js))
    .pipe(eslint.format())
    .pipe(eslint.format('checkstyle', function (results) {
      mkdirp(path.dirname(paths.reports.js), function () {
        fs.writeFileSync(paths.reports.js, results);
      });
    }));
}

gulp.task('js:lint', task);

module.exports = task;
