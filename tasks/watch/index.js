'use strict';

const gulp = require('gulp');
const watch = require('gulp-watch');
const livereload = require('gulp-livereload');
const paths = require('../../config/paths');
const config = {
  livereload: require('../config/livereload')
};

gulp.task('watch', () => {
  livereload.listen(config.livereload);

  watch(paths.src.copy, () => gulp.start('copy'));

  watch(paths.src.fonts, () => gulp.start('fonts'));

  watch(paths.src.icons.svg, () => gulp.start('icons'));

  watch(paths.src.images, () => gulp.start('images'));

  watch(paths.src.sass, () => gulp.start('styles'));

  watch(paths.src.templates.root, () => gulp.start('templates'));
});
