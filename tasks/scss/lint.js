'use strict';

var gulp = require('gulp');
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
var sasslint = require('gulp-sass-lint');
var stream = require('stream');
var paths = require('../../config/paths');
var config = {
  sasslint: require('../../config/sasslint')
};

function task (cb) {
  if (process.env.NODE_ENV === 'production') {
    return mkdirp(path.dirname(paths.reports.sass), function () {
      var file = stream.Writable();
      var data;

      file._write = function (chunk, encoding, next) {
        data = data + chunk;

        next();
      };

      return gulp
        .src(paths.src.sass)
        .pipe(sasslint(config.sasslint))
        .pipe(sasslint.format(file))
        .on('finish', function () {
          data = data.replace(/\<\?xml version\=\"\d\.\d\" encoding\=\"utf\-8\"\?\>\<checkstyle version\=\"\d\.\d\"\>/g, '');
          data = data.replace(/\<\/checkstyle\>/g, '');
          data = '<?xml version="1.0" encoding="utf-8"?><checkstyle version="4.3">' + data + '</checkstyle>';

          fs.writeFile(paths.reports.sass, data, function () {
            cb();
          });
        });
    });
  }

  return gulp
    .src(paths.src.sass)
    .pipe(sasslint(config.sasslint))
    .pipe(sasslint.format());
}

gulp.task('scss:lint', task);

module.exports = task;
