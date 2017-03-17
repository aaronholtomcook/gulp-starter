'use strict';

const gulp = require('gulp');
const watch = require('gulp-watch');
const livereload = require('gulp-livereload');
const paths = require('../../config/paths');

gulp.task('watch', () => {
  livereload.listen();

  watch(paths.src.copy, function () {
    gulp.start('copy');
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

  watch(paths.src.sass, function () {
    gulp.start('styles');
  });

  watch(paths.src.templates.root, function () {
    gulp.start('templates');
  });
});
