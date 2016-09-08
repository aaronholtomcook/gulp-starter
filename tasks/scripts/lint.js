var gulp = require('gulp'),
  eslint = require('gulp-eslint'),
  fs = require('fs'),
  mkdirp = require('mkdirp'),
  paths = require('../../config/paths');

function task () {
  return gulp.src(paths.src.js)
    .pipe(eslint(paths.lint.js))
    .pipe(eslint.format())
    .pipe(eslint.format('checkstyle', function (output) {
      mkdirp(paths.reports.js, function() {
        fs.writeFileSync(paths.reports.jsXml, output);
      });
    }));
}

gulp.task('js:lint', task);
module.exports = task;
