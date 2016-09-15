'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var paths = require('../../config/paths');
var settings = require('../../config/settings');

function task () {
  watch(paths.src.copy, function () {
    gulp.start('copy');
  });

  watch(paths.src.server.dir, function () {
    gulp.start('express');
  });

  watch(paths.src.fonts, function () {
    gulp.start('fonts');
  });

  watch(paths.src.icons, function () {
    gulp.start('icons');
  });

  watch(paths.src.images, function () {
    gulp.start('images');
  });

  if (settings.scripting === 'ts') {
    watch(paths.src.ts.scripts, function () {
      gulp.start('ts');
    });
  } else {
    watch(paths.src.js.scripts, function () {
      gulp.start('js');
    });
  }

  watch(paths.src.sass, function () {
    gulp.start('scss');
  });

  watch(paths.src.templates.root, function () {
    gulp.start('templates');
  });
}

gulp.task('watch', task);

module.exports = task;
