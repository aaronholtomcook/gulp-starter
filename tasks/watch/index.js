'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var paths = require('../../config/paths');

function task () {
  watch(paths.src.icons, function () {
    gulp.start('icons');
  });

  watch(paths.src.images, function () {
    gulp.start('images');
  });

  watch(paths.src.js.scripts, function () {
    gulp.start('js');
  });

  watch(paths.src.sass, function () {
    gulp.start('scss');
  });

  watch(paths.src.templates.root, function () {
    gulp.start('templates');
  });
}

gulp.task('watch', task);

module.exports = task;
